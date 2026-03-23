import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

class MainLayout extends StatelessWidget {
  final Widget child;

  const MainLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    
    int currentIndex = 0;
    if (location.startsWith('/vehicles')) {
      currentIndex = 1;
    } else if (location.startsWith('/contact')) {
      currentIndex = 2;
    } else if (location.startsWith('/about')) {
      currentIndex = 3;
    }

    const primaryColor = Color(0xFFFF5722);

    return Scaffold(
      extendBody: true, // Allows content to go behind the floating nav bar
      body: child,
      bottomNavigationBar: Container(
        margin: const EdgeInsets.fromLTRB(24, 0, 24, 30),
        height: 70,
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.95),
          borderRadius: BorderRadius.circular(35),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.15),
              blurRadius: 30,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(35),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(context, 0, Icons.home_rounded, "Accueil", currentIndex == 0, () => context.go('/home')),
              _buildNavItem(context, 1, Icons.directions_car_rounded, "Flotte", currentIndex == 1, () => context.go('/vehicles')),
              _buildNavItem(context, 2, Icons.mail_rounded, "Contact", currentIndex == 2, () => context.go('/contact')),
              _buildNavItem(context, 3, Icons.info_rounded, "Infos", currentIndex == 3, () => context.go('/about')),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, int index, IconData icon, String label, bool isActive, VoidCallback onTap) {
    const primaryColor = Color(0xFFFF5722);
    
    return InkWell(
      onTap: onTap,
      splashColor: Colors.transparent,
      highlightColor: Colors.transparent,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? primaryColor.withValues(alpha: 0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(25),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isActive ? primaryColor : Colors.grey.shade600,
              size: 24,
            ),
            if (isActive) ...[
              const SizedBox(width: 8),
              AnimatedOpacity(
                duration: const Duration(milliseconds: 300),
                opacity: isActive ? 1.0 : 0.0,
                child: Text(
                  label,
                  style: GoogleFonts.outfit(
                    color: primaryColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
