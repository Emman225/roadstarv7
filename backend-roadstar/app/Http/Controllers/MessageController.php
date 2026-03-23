<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of messages (Admin)
     */
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    /**
     * Get unread messages count (Admin)
     */
    public function unreadCount()
    {
        $count = Message::where('is_read', false)->count();
        return response()->json(['count' => $count]);
    }

    /**
     * Get statistics (Admin)
     */
    public function stats()
    {
        $stats = [
            'total' => Message::count(),
            'unread' => Message::where('is_read', false)->count(),
            'read' => Message::where('is_read', true)->count(),
            'contacts' => Message::where('type', 'contact')->count(),
            'reservations' => Message::where('type', 'reservation')->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Store a new message from contact form (Public)
     */
    public function storeContact(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:50',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'name' => trim($request->nom . ' ' . $request->prenom),
            'email' => $request->email,
            'phone' => $request->telephone,
            'subject' => 'Nouveau message du site',
            'message' => $request->message,
            'type' => 'contact',
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Message envoyé avec succès',
            'data' => $message
        ], 201);
    }

    /**
     * Store a new reservation message (Public)
     */
    public function storeReservation(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:50',
            'message' => 'required|string',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'vehicle_name' => 'nullable|string|max:255', // keeping for compatibility or fallback
        ]);

        $message = Message::create([
            'name' => trim($request->nom . ' ' . $request->prenom),
            'email' => $request->email,
            'phone' => $request->telephone,
            'message' => $request->message,
            'vehicle_id' => $request->vehicle_id,
            'subject' => $request->vehicle_name ? 'Réservation : ' . $request->vehicle_name : 'Demande de réservation',
            'type' => 'reservation',
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Demande de réservation envoyée avec succès',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified message (Admin)
     */
    public function show($id)
    {
        $message = Message::with('vehicle')->findOrFail($id);
        return response()->json($message);
    }

    /**
     * Mark message as read (Admin)
     */
    public function markAsRead($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['is_read' => true]);

        return response()->json([
            'message' => 'Message marqué comme lu',
            'data' => $message
        ]);
    }

    /**
     * Mark message as unread (Admin)
     */
    public function markAsUnread($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['is_read' => false]);

        return response()->json([
            'message' => 'Message marqué comme non lu',
            'data' => $message
        ]);
    }

    /**
     * Remove the specified message (Admin)
     */
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json([
            'message' => 'Message supprimé avec succès'
        ]);
    }

    /**
     * Get messages by type (Admin)
     */
    public function getByType($type)
    {
        $messages = Message::where('type', $type)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($messages);
    }
}
