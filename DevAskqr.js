const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('0029VahusSh0QeaoFzHJCk2x')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: DEV_ASK,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function ASK_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let ask = DEV_ASK({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Queen Ruby"),
			});

			ask.ev.on('creds.update', saveCreds)
			ask.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await ask.sendMessage(ask.user.id, { text: '' + b64data });
	
				   let devask = `_____________________________________
╔════◇
║❒ 𝚂𝙰𝙻𝚄𝚃 𝙼𝙾𝙸 𝙲’𝙴𝚂𝚃 𝚀𝚄𝙴𝙴𝙽 𝚁𝚄𝙱𝚈 
║❒ 𝙼𝙳 𝙿𝙾𝚄𝚁 𝚃𝙴 𝚂𝙴𝚁𝚅𝙸𝚁𝙴. 😚 𝙹𝙴 𝚂𝚄𝙸𝚂 
║❒ 𝙰𝙲𝙲𝙾𝚁𝙳𝙴 𝙰𝚅𝙴𝙲 𝚃𝙰 𝚂𝙴𝚂𝚂𝙸𝙾𝙽 𝙸𝙳
╚═══════════════════╝

╭──✧*QUEEN RUBY*✧───╮
├ ❏ 𝙽𝚄𝙼𝙱𝙴𝚁 𝙳𝙴𝚅: +24165183695
├ ❏ 𝙽𝙾𝙼 𝙳𝚄 𝙱𝙾𝚃 : *𝐐𝐮𝐞𝐞𝐧 𝐑𝐮𝐛𝐲 𝐌𝐝*
├ ❏ 𝙽𝙾𝙼𝙱𝚁𝙴𝚂 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝙴 : 150
├ ❏ 𝙳𝙴𝚅 : 𝐃𝐞𝐯 𝐀𝐬𝐤, 𝐊𝐚𝐲𝐚, 𝐒𝐞𝐧𝐤𝐮
├ ❏ 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : *1.0.0*
╰──────────────╯
├ 𝙳𝚎𝚟 𝚊𝚜𝚔 𝚊𝚚𝚞𝚊_𝚀𝚞𝚎𝚎𝚗 𝚁𝚞𝚋𝚢 𝙼𝙳 👇
╭──✧*WA CHANNEL*✧───╮
├ ❏ https://whatsapp.com/channel/0029Vb5npq60gcfRMVSptL1i
╰──────────────╯

𝙻𝙴 𝙱𝙾𝚃 𝚁𝚄𝙱𝚈 𝙼𝙳 𝙴𝚂𝚃 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴́ ✅..!! `
	 await ask.sendMessage(ask.user.id,{text:devask},{quoted:session})



					await delay(100);
					await ask.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					ASK_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await ASK_QR_CODE()
});
module.exports = router