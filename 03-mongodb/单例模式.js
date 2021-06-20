class DB {
    static getConnect() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    constructor() {
        this.connect()
    }

    connect() {
        console.log('连接数据库')
    }
    find() {
        console.log('查找数据')
    }
}

let a1 = DB.getConnect();
let a2 = DB.getConnect()

a1.find()
a2.find()
