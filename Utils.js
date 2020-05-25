var promisify = (fn, ctx, ...args) => {
    //console.log('first arguement is: '+ fn);
    console.log('second arguement is: '+ ctx);
    console.log('third arguement is: '+ args);


    if (!ctx) {
        console.log("not ctxxxx");
        ctx = fn;
    }

    return new Promise((resolve, reject) => {
        console.log('reject is: '+ reject)
        console.log('resolve is: '+ resolve)

        args.push((err, data) => {

            if (err) {
                console.log('err is: '+ err)

                reject(err);
            }
            else {
                console.log('data is: '+ data)

                resolve(data);
            }
        });
        console.log('args is:  '+ args)
        console.log('ctx is:  '+ ctx)


        fn.apply(ctx, args)
    });
};


module.exports = {
    promisify
};