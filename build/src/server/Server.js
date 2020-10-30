"use strict";
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
exports.createServer = void 0;
class Server {
    constructor() {
        this.initMiddlewares();
        this.initRoutes();
    }
    initMiddlewares() { }
    initRoutes() { }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    close() {
        var _a;
        return (_a = this.server) === null || _a === void 0 ? void 0 : _a.close();
    }
}
;
exports.default = Server;
exports.createServer = (server) => {
    try {
        const { default: ServerClass } = require(`./${server}`);
        return new ServerClass();
    }
    catch (err) {
        throw new Error(`No se pudo crear el servidor: ${err.message}`);
    }
};
//# sourceMappingURL=Server.js.map