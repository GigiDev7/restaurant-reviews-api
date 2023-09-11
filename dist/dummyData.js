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
const mongoose_1 = __importDefault(require("mongoose"));
const sch = new mongoose_1.default.Schema({});
const Restaurant = mongoose_1.default.model("Restaurant", sch);
const urls = [
    "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
    "https://images.getbento.com/accounts/0dd435255ed47ef59b07b494968680e4/media/images/12960PQ_CHICAGO_INTERIOR_FULL.jpg?w=1200&fit=crop&auto=compress,format&crop=focalpoint&fp-x=0.5&fp-y=0.5",
    "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    "https://media.timeout.com/images/105856239/750/562/image.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4WTLCux61tDuftZmC-HwjG-_zA62wF4loi517rnFLyoTU1qalT7hzerEG5wCM06Czz4&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ih5PpaWUbnCmPHGwdytz5b4xZRXXDpIdau7oUKOEPiVJD2Po9xqIyBwQkSNYSXgXiT8&usqp=CAU",
    "https://cdn.vox-cdn.com/thumbor/4XmbHmx4JVmwV7UPXFKpG6jIyOc=/0x0:5713x3809/1200x800/filters:focal(2400x1448:3314x2362)/cdn.vox-cdn.com/uploads/chorus_image/image/72216725/Photo_Apr_25_2023__7_16_22_AM.0.jpg",
    "https://b.zmtcdn.com/data/collections/2e5c28a5fbcb2b35d84c0a498b0e1ba2_1674823998.jpg?fit=around|562.5:360&crop=562.5:360;*,*",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROG0OiOT31cCj13lPFnAJZQLbCNBkunwEW0meqVs9C6Xgp9WbqhLmYW5rvRFzYlT3x3Y4&usqp=CAU",
];
function generateData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://user:user@cluster0.zstge.mongodb.net/sample_restaurants?retryWrites=true&w=majority");
        const data = yield Restaurant.find().limit(10);
        const newData = [];
        let i = 0;
        for (const item of data) {
            let newObj = {
                name: item._doc.name,
                address: `${item._doc.address.street} ${item._doc.address.building}`,
                imageUrl: urls[i],
            };
            newData.push(newObj);
            i++;
        }
        return newData;
    });
}
exports.default = generateData;
