export interface User {
  _id?: string
  name?: string
  phones: [{
    _id?: string
  }]
  channels?: []
  depart: {
    _id: string
    name: string
    desc: string
  }
  roles: [
    {
    value: string
    description: string
  }
  ]
  password: string
  description?: string
}
export interface Depart {
  name: string
  desc: string
  _id: string
  img: string
}
export interface Phone {
  _id?: string
  idUser: string
  phone: string
  desc: string
}
export interface Message {
  message: string
}

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
}

