module.exports = {
    register: async (req, res, next) => {
        const { username, password } = req.body;
        const dbInstance = req.app.get('db')
        let createdUser = await dbInstance.register([username, password])
        res.status(200).send(createdUser)
    },
    login: (req, res, next) => {
        const { username, password } = req.body;
        const dbInstance = req.app.get('db')
        dbInstance.login([username, password])
            .then((response) => {
                if (response[0]) {
                    res.status(200).send(response[0])
                } else {
                    res.status(401).send('wrong username or password')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    read: (req, res, next) => {
        const {checked, search} = req.query;
        const {user_id} = req.params;
        console.log(checked, search)
        const dbInstance = req.app.get('db')
        if(checked === true && search){
            dbInstance.getPostsByUserPostsAndSearch([search])
            .then((response) => {
                if (response[0]) {
                    res.status(200).send(response)
                } else {
                    res.status(401).send('wrong username or password')
                }
            })
            .catch((err) => {
                console.log(err)
            })  
        }else if(checked === false && !search){
            dbInstance.getPostsNotByUser(user_id)
            .then((response) => {
                if (response[0]) {
                    res.status(200).send(response)
                } else {
                    res.status(401).send('wrong username or password')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else if(checked === false && search){
            dbInstance.getPostsBySearch([search, user_id])
            .then((response) => {
                if (response[0]) {
                    res.status(200).send(response)
                } else {
                    res.status(401).send('wrong username or password')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            dbInstance.getAllPosts()
            .then((response) => {
                console.log(response)
                if (response[0]) {
                    res.status(200).send(response)
                } else {
                    res.status(401).send('wrong username or password')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    getPost: (req, res, next) => {
        const { post_id } = req.params;
        const dbInstance = req.app.get('db')
        dbInstance.getPost(post_id)
        .then((response) => {
            console.log(response)
            res.status(200).send(response[0])
        })

    }
}