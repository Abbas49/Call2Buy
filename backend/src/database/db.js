import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = 'https://iwlcsqhadirrwyisrejh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


async function uploadFile(file) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage.from('product-images').upload(fileName, file.buffer);
    if (error) {
        console.error("Failed to upload image");
        return null; 
    } else {
        const {data} = await supabase.storage.from('product-images').getPublicUrl(fileName);
        return data.publicUrl;
    }
}

export async function insertProduct(name, price, rate, file) {
    let fileURL = await uploadFile(file);
    if(!fileURL){
        return "Error";
    }

    const { error } = await supabase
        .from('products')
        .insert({ name: name, price: price, rate: rate, image: fileURL });
    return error;
}

export async function fetchProduct() {
    const response = await supabase
        .from('products')
        .select()
    return response
}

export async function uploadProductImage(file) {
    const { data, error } = await supabase.storage
        .from('product-images')
        .upload('public/avatar1.png', file)
    console.log(data);
    console.log(error);
}

async function run() {
    const insertError = await insertProduct("test3", 3, 3);
    if (insertError) {
        console.error(error);
    }
    const { data, error } = await fetchProduct();
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
}

// run();
