const createApp = require("./index")
const PORT = 3000

const listenApp = async () => {
    let app
    app = await createApp()
    const cors = require("cors");
    app.use(cors());
  
    return app.listen(PORT, () => {
        console.log(`Servidor Node rodando na porta ${PORT}`)
    })
}

listenApp()