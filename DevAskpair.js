const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: DEV_ASK,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function ASK_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let ask = DEV_ASK({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Queen Ruby", "", ""]
             });
             if(!ask.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await ask.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            ask.ev.on('creds.update', saveCreds)
            ask.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await ask.sendMessage(ask.user.id, { text: '' + b64data });

               let devask =`______________________________________
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

𝙻𝙴 𝙱𝙾𝚃 𝚁𝚄𝙱𝚈 𝙼𝙳 𝙴𝚂𝚃 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴́ ✅..!!`
 await ask.sendMessage(ask.user.id,{text:devask},{quoted:session})
 

        await delay(100);
        await ask.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    ASK_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await ASK_CODE()
});
module.exports = router