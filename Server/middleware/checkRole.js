const checkRole = (role) => {
return (req,res,next) => {
    if(role.includes(req.user.role)){
        next()
    }else{
        res.status(403).jsoon()({
            message:`This resource is applicable for ${req.user.role} `
        })
    }

}
}

export default checkRole