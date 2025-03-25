import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = 'https://iwlcsqhadirrwyisrejh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function insertProduct(name, price, rate){
    const { error } = await supabase
  .from('products')
  .insert({name: name, price:price, rate:rate });
  return error;
}

export async function fetchProduct(){
    const response = await supabase
    .from('products')
    .select()
    return response
}

export async function uploadProductImage(file){
    const { data, error } = await supabase.storage
    .from('product-images')
    .upload('public/avatar1.png', file)
    console.log(data);
    console.log(error);
}

async function run(){
    const insertError= await insertProduct("test3", 3, 3);
    if(insertError){
        console.error(error);
    }
    const {data, error} = await fetchProduct();
    if(error){
        console.error(error);
    }else{
        console.log(data);
    }
}

// run();
