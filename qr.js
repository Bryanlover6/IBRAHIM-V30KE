const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

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
	async function SIGMA_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Maher_Zubair = Maher_Zubair({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds)
			Qr_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
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
				   let session = await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id, { text: '' + b64data });
	
				   let SIGMA_MD_TEXT = `
*𝙊𝘽𝘼𝙉𝘼𝙄 𝙈𝘿 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿*
*𝘽𝙍𝙔𝘼𝙉𝙏 𝙏𝙀𝘾𝙃*
*𝙇𝙀𝙂𝙄𝙏 𝘽𝙊𝙏*
____________________________________
╔════◇
║『 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍𝙎』

║ ❒ 𝘽𝙍𝙔𝘼𝙉𝙏 𝙏𝙀𝘾𝙃: _https://wa.me/94784192378_

║ ❒ 𝙅𝘼𝙒𝘼𝙏 𝙏𝙀𝘾𝙃: _https://wa.me/8801763036464_

╚════════════════════❒
╔═════◇
║ 『••• OWNER INFO •••』
║ ❒ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: _https://www.youtube.com/@BryantXtech_

║ ❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/23353729233

║ ❒ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: _https://chat.whatsapp.com/DOko0OMbzD3DPZmIADnT95_

║ ❒ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: _https://whatsapp.com/channel/0029VacpEdXIt5rqKLB9nC1L_

║ 
╚════════════════════╝ 
 *𝙊𝘽𝘼𝙉𝘼𝙄 𝙈𝘿*
     𝘽𝙔
𝘽𝙍𝙔𝘼𝙉𝙏 𝙏𝙀𝘾𝙃 𝘼𝙉𝘿 𝙅𝘼𝙒𝘼𝙏 </>
___________________________________

Don't Forget To Give Star To My Repo`
					
	 await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id,{text:SIGMA_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Maher_Zubair.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					SIGMA_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await SIGMA_MD_QR_CODE()
});
module.exports = router
