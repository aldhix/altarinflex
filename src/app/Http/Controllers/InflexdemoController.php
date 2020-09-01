<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InflexdemoController extends Controller
{
    public function index()
    {
    	return view('altar.demo.inflex');
    }

    public function upload(Request $request)
    {
    	$request->validate([
				'image'=>'required|image'
			]); /**/
		$file_name = 'tmp_'.date('Y-m-d-H-i-s').'_'.rand(99,999).'.'.$request->file('image')->extension();
		move_uploaded_file($request->file('image'),"images/".$file_name);
		return [ 
			'filename'=>url('images/'.$file_name),
		];
    }

    public function destroy(Request $request)
    {
    	$filename = request()->filename;
	    $file = 'images/'.$filename;
	    if(is_file($file)){
	    	unlink($file);
	    }
	    return $filename;
    }
}
