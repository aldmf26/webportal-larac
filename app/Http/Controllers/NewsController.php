<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $data = [
            'news' => new NewsCollection(News::orderBy('id', 'desc')->paginate(4)),
            'title' => 'Cuys News',
            'description' => 'selamat datang di portal web'
        ];
        return Inertia::render('Homepage', $data);
    }

    public function create()
    {
        //
    }

    public function store(Request $r)
    {
        News::create([
            'title' => $r->title,
            'description' => $r->description,
            'category' => $r->category,
            'author' => Auth::user()->email,
        ]);

        return redirect()->back()->with('message', 'Berita berhasil dibuat');
    }


    public function show(News $news)
    {
        $data = [
            'myNews' => News::where('author', Auth::user()->email)->get(),
        ];
        return Inertia::render('Dashboard', $data);
    }


    public function edit($id)
    {
        return Inertia::render('EditNews',[
            'myNews' => News::find($id)
        ]);
    }


    public function update(Request $r)
    {
        News::where('id', $r->id)->update([
            'title' => $r->title,
            'description' => $r->description,
            'category' => $r->category,
        ]);
        
        return redirect()->back()->with('message', 'Berita berhasil diedit');
    }

    public function destroy($id)
    {
        News::find($id)->delete();
        return redirect()->back()->with('message', 'Berita berhasil dihapous');
    }
}
