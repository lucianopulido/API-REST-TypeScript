"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
function createServer() {
    var app = express_1.default();
    app.get('/resultados/:equipo1/:equipo2', function (req, res) {
        var _a, _b;
        try {
            var team1 = database_1.getClub(req.params.equipo1);
            var team2 = database_1.getClub(req.params.equipo2);
            var match = database_1.getResultado(team1, team2);
            if (match.score) {
                res.json({
                    date: match.date,
                    result: team1 + " " + ((_a = match.score) === null || _a === void 0 ? void 0 : _a.ft[0]) + " - " + ((_b = match.score) === null || _b === void 0 ? void 0 : _b.ft[1]) + " " + team2
                });
            }
            else {
                res.json({
                    date: match.date,
                });
            }
        }
        catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    });
    return app;
}
exports.default = createServer;
