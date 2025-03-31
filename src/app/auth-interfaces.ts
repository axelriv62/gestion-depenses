export type getResponseLogin = {
  "success": boolean,
  "data": {
    "user": {
      "id": number,
      "name": string,
      "email": string,
      "admin": boolean
    },
    "token": string,
    "token_type": string
  },
  "message": string
}

export type User = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  token: string;
}

export type Identite = {
  email: string;
  password: string;
}

export type RegisterRequest = {
  nom: string;
  prenom: string;
  plafond: number;
  password: string;
}

export type GetResponseRegister = {
  "success": boolean,
  "data": {
    "token": string,
    "token_type": string,
    "personne": {
      "id": number,
      "nom": string,
      "prenom": string,
      "plafond": string,
      "user": {
        "id": number,
        "name": string,
        "email": string,
        "admin": boolean,
      },
      "montantDepenses": number
    }
  },
  "message": string
}

export const ANONYMOUS_USER: User = <User>{
  id: 0,
  name: '',
  email: '',
  admin: false,
  token: ''
};
