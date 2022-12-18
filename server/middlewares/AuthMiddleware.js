import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {

    const accessToken = req.header("accessToken");

   // if (!accessToken) return res.json({ error: "User is not logged in!" });

    try {
        console.log(accessToken)
        if (typeof accessToken !== 'undefined') {
            const validToken = jwt.verify(accessToken, "importantsecret");
            console.log(validToken);
            console.log("MIDDLEWARE YES USER")
            req.user = validToken;
            return next();
        } else {
            req.user = "";
            return next();
        }
        
        
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
    

};

export default validateToken ;