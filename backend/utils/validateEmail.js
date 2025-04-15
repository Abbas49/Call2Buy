const validateEmail = (email)=>{
    const patter = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return patter.test(email);
}

export default validateEmail;