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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencias externas
const fastify_1 = __importDefault(require("fastify"));
// Dependencias internas
const Server_1 = __importDefault(require("./Server"));
class ServerFastify extends Server_1.default {
    constructor() {
        super();
        this.server = fastify_1.default({ logger: false });
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.server.listen(port, '0.0.0.0');
        });
    }
}
;
exports.default = ServerFastify;
//# sourceMappingURL=Fastify.js.map