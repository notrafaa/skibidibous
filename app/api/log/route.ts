import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1512503973398183956/xcdMQDj59ET0QO3wi7jo32bp5I2Hdwdieutk6iaOwevdfbNbQYB53EpyprWBDzSbi4xT';

export async function POST(request: NextRequest) {
  // Grab public IP (works perfectly on Vercel, gives ::1 only in local dev)
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             '0.0.0.0';

  const headers = Object.fromEntries(request.headers.entries());
  
  // Prepare a fancy embed for Discord
  const embed = {
    title: "🐻 Bonzi caught a visitor!",
    color: 0x9b59b6, // Bonzi purple!
    fields: [
      { name: "🌐 Public IP", value: ip, inline: true },
      { name: "💻 User Agent", value: headers['user-agent'] || 'unknown', inline: false },
      { name: "🗣️ Accept Language", value: headers['accept-language'] || 'unknown', inline: true },
      { name: "🔧 Accept Encoding", value: headers['accept-encoding'] || 'unknown', inline: true },
      { name: "📱 Sec-CH-UA", value: headers['sec-ch-ua'] || 'unknown', inline: false },
      { name: "🖥️ Platform", value: headers['sec-ch-ua-platform'] || 'unknown', inline: true },
      { name: "📲 Mobile?", value: headers['sec-ch-ua-mobile'] === '?1' ? 'Yes' : 'No', inline: true },
      { name: "🔗 Referer", value: headers['referer'] || 'direct', inline: false },
      { name: "⏰ Timestamp", value: new Date().toISOString(), inline: true },
    ],
    footer: { text: "BonziBuddy Helper v5.0.0 • Unstoppable Sunshine" },
    timestamp: new Date().toISOString(),
  };

  const discordPayload = { embeds: [embed] };

  // Send to Discord webhook
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });
    if (res.ok) {
      console.log('🟣 Bonzi webhook delivered to Discord!');
    } else {
      console.error(`Discord returned ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error('Bonzi webhook error:', err);
  }

  return NextResponse.json({ message: "Bonzi sent to Discord! Neato!" });
}