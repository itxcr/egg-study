const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
const ObjectId = require('mongodb').ObjectID;

class DB {
    client = null;

    constructor() {
        // 实例化时候就连接数据库
        this.connect();
    }

    // 实现单例模式  解决多次实例化不共享的问题
    static getConnect() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    connect() {
        return new Promise((async (resolve, reject) => {
            // 解决数据库多次连接的问题
            if (this.client === null) {
                const client = await MongoClient.connect(Config.dbUrl);
                this.client = client.db(Config.dbName);
                resolve(this.client)
            }
            resolve(this.client)
        }));
    }

    find(collection, json = {}) {
        return new Promise((async (resolve) => {
            let db = await this.connect();
            let result = db.collection(collection).find(json);
            resolve(await result.toArray());
        }));
    }

    async insert(collection, json) {
        return new Promise((async (resolve) => {
            let db = await this.connect();
            let result = db.collection(collection).insertOne(json);
            resolve(await result);
        }));
    }

    async update(collection, origin, target) {
        return new Promise((async (resolve) => {
            let db = await this.connect();
            let result = db.collection(collection).updateOne(origin, {
                $set: target,
            });
            resolve(await result);
        }));
    }

    async delete(collection, json) {
        return new Promise((async (resolve) => {
            let db = await this.connect();
            let result = db.collection(collection).removeOne(json);
            resolve(await result);
        }));
    }

    getObjectId(id) {
        return new ObjectId(id)
    }

}

// let db = DB.getConnect();
// console.time('start')
// db.find('user').then(data => {
//     // console.log(data);
//     console.timeEnd('start')
// });
//
// setTimeout(() => {
//     console.time('start1')
//     db.find('user').then(data => {
//         // console.log(data);
//         console.timeEnd('start1')
//     });
// }, 1000)
//
//
// let db1 = DB.getConnect();
// setTimeout(() => {
//     console.time('start2')
//     db1.find('user').then(data => {
//         // console.log(data);
//         console.timeEnd('start2')
//     });
// }, 2000)
//
// setTimeout(() => {
//     console.time('start3')
//
//     db1.find('user').then(data => {
//         // console.log(data);
//         console.timeEnd('start3')
//     });
// }, 3000)
module.exports = DB.getConnect()
