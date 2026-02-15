export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Basic content-type handling
    const ct = request.headers.get("content-type") || "";
    let data = {};
    if (ct.includes("application/json")) {
      data = await request.json();
    } else if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
      const form = await request.formData();
      for (const [k, v] of form.entries()) data[k] = v;
    } else {
      // Try JSON anyway
      data = await request.json().catch(() => ({}));
    }

    const name = (data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const phone = (data.phone || "").toString().trim();
    const type = (data.type || "").toString().trim();
    const msg = (data.msg || data.message || "").toString().trim();

    // Simple validation
    if (!name || !email || !msg) {
      return json({ ok: false, error: "Missing required fields." }, 400);
    }

    // Lightweight spam guard (honeypot field)
    if ((data.website || "").toString().trim()) {
      return json({ ok: true }, 200);
    }

    const to = env.CONTACT_TO;
    const from = env.CONTACT_FROM; // must be an address on your domain
    if (!to || !from) {
      return json({ ok: false, error: "Server not configured (CONTACT_TO/CONTACT_FROM)." }, 500);
    }

    const subject = `WestMind enquiry — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Preferred: ${type || "-"}`,
      "",
      msg,
      "",
      `Sent from: ${new URL(request.url).origin}`
    ].join("\n");

    const payload = {
      personalizations: [{ to: [{ email: to }], dkim_domain: from.split("@")[1] }],
      from: { email: from, name: "WestMind Psychology" },
      subject,
      content: [{ type: "text/plain", value: body }],
      reply_to: { email }
    };

    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return json({ ok: false, error: "Email send failed.", detail: t.slice(0, 400) }, 502);
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ ok: false, error: "Unexpected error.", detail: String(e).slice(0, 300) }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
