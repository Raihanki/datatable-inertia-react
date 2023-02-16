<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public $limit = 15;
    public function index(Request $request)
    {
        $query = User::query();
        if ($request->has('search')) {
            $query->where('username', 'like', '%' . $request->search . '%');
        }
        $users = (UserResource::collection($query->paginate($request->limit))
        )->additional([
            'options' => [
                'limit' => $request->limit ?? $this->limit,
                'page' => $request->page ?? 1,
            ]
        ]);
        return inertia('User/Index', [
            "users" => $users
        ]);
    }
}
