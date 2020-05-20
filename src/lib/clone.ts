function  clone<X>(xxx: X): X {
        return JSON.parse(JSON.stringify(xxx))
}
export  default clone
