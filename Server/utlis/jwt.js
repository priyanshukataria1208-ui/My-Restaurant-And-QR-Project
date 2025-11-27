import jwt from 'jsonwebtoken';

export const genrateAccessToken=(paylod)=>{
    return jwt.sign(paylod,"6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",{expiresIn:"15m"})
}
export const genraterefreshToken=(paylod)=>{
    return jwt.sign(paylod,"6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",{expiresIn:"7d"})
}