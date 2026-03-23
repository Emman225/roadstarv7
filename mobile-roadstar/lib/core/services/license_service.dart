import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_fonts/google_fonts.dart';

class LicenseService {
  static const String _firstLaunchKey = 'app_first_launch_date';
  
  // CONFIGURATION DU DÉLAI
  // Pour le test : 10 minutes
  //static const Duration _licenseDuration = Duration(minutes: 10);
  
  // Pour la production (2 semaines) :
  static const Duration _licenseDuration = Duration(days: 7);

  static Future<bool> isLicenseValid() async {
    final prefs = await SharedPreferences.getInstance();
    int? firstLaunchTimestamp = prefs.getInt(_firstLaunchKey);
    final now = DateTime.now();

    if (firstLaunchTimestamp == null) {
      await prefs.setInt(_firstLaunchKey, now.millisecondsSinceEpoch);
      return true;
    }

    final firstLaunchDate = DateTime.fromMillisecondsSinceEpoch(firstLaunchTimestamp);
    final expiryDate = firstLaunchDate.add(_licenseDuration);

    return now.isBefore(expiryDate);
  }

  static void showExpiryDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false, // L'utilisateur ne peut pas fermer en cliquant à côté
      builder: (BuildContext context) {
        return PopScope(
          canPop: false, // Empêche le retour en arrière Android
          child: AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            backgroundColor: Colors.white,
            title: Row(
              children: [
                const Icon(Icons.warning_amber_rounded, color: Colors.red, size: 28),
                const SizedBox(width: 10),
                Text(
                  "Licence Expirée",
                  style: GoogleFonts.outfit(fontWeight: FontWeight.bold, color: Colors.black87),
                ),
              ],
            ),
            content: Text(
              "La licence est arrivée à expiration, veuillez contacter l'administrateur.",
              style: GoogleFonts.outfit(fontSize: 15, color: Colors.grey.shade700),
            ),
            actions: [
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFF5722),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                  onPressed: () {
                    // Fermer l'application
                    if (Platform.isAndroid) {
                      SystemNavigator.pop();
                    } else if (Platform.isIOS) {
                      exit(0);
                    }
                  },
                  child: const Text("FERMER L'APPLICATION", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
