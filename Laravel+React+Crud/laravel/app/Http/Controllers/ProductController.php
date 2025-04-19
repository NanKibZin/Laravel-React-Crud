<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function list(){

        $products = Product::all();

        return response([
            'products'  => $products
        ],200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'price' =>'required|numeric',
            'qty' =>'required|numeric'
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ],400);
        }
        try{
            $product = Product::create([
                'name' => $request->name,
                'price' => $request->price,
                'qty' => $request->qty
            ]);
            return response([
                'message' => 'Product created successfully',
                'product' => $product
            ],201);

        }catch(\Exception $e){
            return response([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ],500);
        }
    }
    public function getProductById(string $id){
      $product=Product::find($id);
      if(!$product){
        return response([
            "status"=>"error",
            "message"=>"Product not found"
        ],404);
      }else{
          return response([
            "status"=>true,
            "product"=>$product,
          ],200);
      }
    }
    public function delete(string $id){
       $product=Product::find($id);
       $product->delete();
       return response([
        "status"=>"true",
        "message"=>"Product Deleted"
       ],200);
    }
    public function update(Request $request,string $id){
        $product=Product::find($id);
        if(!$product){
            return response([
                "status"=>"error",
                "message"=>"Product not found",
            ],404);
        }else{

            $validator = Validator::make($request->all(),[
                'name' => 'required',
                'price' =>'required|numeric',
                'qty' =>'required|numeric'
            ]);
            if($validator->fails()){
                return response([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ],400);
            }
            try{
                $product->update([
                    'name' => $request->name,
                    'price' => $request->price,
                    'qty' => $request->qty
                ]);
                return response([
                    'message' => 'Product updated successfully',
                    'product' => $product
                ],201);
    
            }catch(\Exception $e){
                return response([
                    'message' => 'Internal Server Error',
                    'error' => $e->getMessage()
                ],500);
            }
        }
        }
}
