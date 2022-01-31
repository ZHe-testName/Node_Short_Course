//middleware - тут нужен для того чтобы парсить JSON
//по класике это просто функция которая принимает request responce next(функция 
//которая будет вызвана когда отработает middleware )
//но мы так делать не будем, а будем вызываты все 
//миделвеарс одновремменно

module.exports = (req, res) => {
    res.send = data => {
        res.writeHead(200, {
            'Content-type': 'application/json',
        });

        res.end(JSON.stringify(data));
    };
};