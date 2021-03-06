
module.exports = class SecureSocket {
    constructor(cipher) {
        this.cipher = cipher;
    };

    encodeBuffer(chunk) {
        // if (Buffer.isBuffer(chunk)) {
        //     chunk = [...chunk];
        // }
        if(!chunk){
            return;
        }
        let encode = this.cipher.encode(chunk);
        return encode;
    }

    decodeBuffer(chunk) {
        // if (Buffer.isBuffer(chunk)) {
        //     chunk = [...chunk];
        // }
        if(!chunk){
            return;
        }
        let decode = this.cipher.decode(chunk);
        return decode;
    }
    async socketWrite(socket,buffer){
        let _this = this;
        return new Promise((resolve,reject)=>{
            socket.write(_this.encodeBuffer(buffer),function (err) {
                if (err) reject(err);
                resolve();
            })
        })
    }
    async socketRead(socket){
        let _this = this;
        return new Promise((resolve)=>{
            socket.once('readable',()=>{
                resolve(_this.decodeBuffer(socket.read()));
            });
        })
    }
}

