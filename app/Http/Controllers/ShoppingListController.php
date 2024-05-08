<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class ShoppingListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render("ShoppingList", [
            'items' => ShoppingList::all(),
        ]);
    }
    public function clear()
    {
        ShoppingList::truncate(); // Delete all items from the shopping items table
        
        return redirect()->route('shoppinglist.index')->with('success', 'Shopping list cleared successfully');
    }
    public function sort(Request $request): Response
    {
        $sortBy = $request->input('sortBy');
        if ($sortBy === 'date') {
            // Redirect to the initial route
            return Inertia::render("ShoppingList", [
                'items' => ShoppingList::all(),
            ]);
        }

        $sortedItems = ShoppingList::orderBy($sortBy)->get();
        // dd($sortedItems->pluck('name', 'id')->toArray());
        return Inertia::render("ShoppingList", [
            'items' => $sortedItems,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "itemName" => "required|string|max:255",
            "itemPrice" => "string|max:255",
            "itemType" => "required|string|max:255",
        ]);

        $item = new ShoppingList();
        $item->name = $validated['itemName']; // Assign the validated item name to the name attribute
        $item->price = $validated['itemPrice']; // Assign the validated item price to the price attribute
        $item->type = $validated['itemType']; // Assign the validated item price to the price attribute
        $item->save(); // Save the item to the database

        return redirect(route("shoppinglist.index"))->with("success","");
    }

    /**
     * Display the specified resource.
     */
    public function show(ShoppingList $shoppingList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShoppingList $shoppingList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShoppingList $shoppingList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(array $selectedItems): RedirectResponse
    {
        foreach ($selectedItems as $index) {
            ShoppingList::destroy($index);
        }  //Change to delete a whole array

        return redirect()->route("shoppinglist.index");
    }

    public function massDelete(Request $request): RedirectResponse
    {
        $ids = $request->input('selectedItems');
        ShoppingList::destroy($ids);

        return  redirect(route("shoppinglist.index"))->with("success","");
    }
}
