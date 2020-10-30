"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencias externas
const dotenv = __importStar(require("dotenv"));
// Dependencias internas
const Server_1 = require("./server/Server");
const app_1 = require("./utils/constants/app");
const config_1 = require("./utils/constants/config");
// Configuración inicial
dotenv.config();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crea instancia de la aplicación
        const server = Server_1.createServer(config_1.SERVER);
        console.info('--[ Iniciando apliación ]--');
        // Inicia servidor
        yield server.start(app_1.PORT);
        console.info(`Server (${config_1.SERVER}) iniciado en el puerto ${app_1.PORT}`);
    }
    catch (err) {
        console.error(err.message);
        finish();
    }
    ;
});
const finish = () => {
    console.info('--[ Deteniendo aplicación ]--');
    process.exit(1);
};
init();
//# sourceMappingURL=index.js.map