import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    const primaryColor = Color(0xFFFF5722);
    
    return Scaffold(
      backgroundColor: const Color(0xFFF4F6F8),
      body: CustomScrollView(
        slivers: [
          // Elegant Header
          SliverAppBar(
            expandedHeight: 220,
            pinned: true,
            backgroundColor: primaryColor,
            elevation: 0,
            leading: IconButton(
              icon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.2),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.arrow_back, color: Colors.white, size: 20),
              ),
              onPressed: () => context.canPop() ? context.pop() : context.go('/home'),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Image.asset(
                    'assets/images/bgm.png',
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.4),
                          primaryColor.withValues(alpha: 0.8),
                        ],
                      ),
                    ),
                  ),
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const SizedBox(height: 40),
                        Image.asset(
                          'assets/icons/New_logo-RoadStar_blanc.png',
                          height: 70,
                          fit: BoxFit.contain,
                        ),
                        const SizedBox(height: 10),
                        Text(
                          "L'Élite de la Mobilité",
                          style: GoogleFonts.outfit(
                            color: Colors.white.withValues(alpha: 0.9),
                            fontSize: 16,
                            letterSpacing: 1.2,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 30, 20, 120),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSectionTitle("Notre Vision"),
                  const SizedBox(height: 16),
                  _buildPremiumCard(
                    child: Text(
                      "Roadstar est né d'une volonté simple : offrir à Abidjan un service de location de véhicules qui allie le prestige international aux exigences locales de fiabilité. Nous ne louons pas seulement des voitures, nous facilitons vos ambitions.",
                      style: TextStyle(
                        fontSize: 15,
                        height: 1.7,
                        color: Colors.grey.shade800,
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),

                  _buildSectionTitle("Les Engagements Roadstar"),
                  const SizedBox(height: 16),
                  _buildEngagementItem(
                    icon: Icons.verified_user_outlined,
                    title: "Excellence Certifiée",
                    description: "Chaque véhicule de notre flotte subit une inspection rigoureuse avant chaque mise à disposition.",
                  ),
                  _buildEngagementItem(
                    icon: Icons.support_agent_rounded,
                    title: "Conciergerie 24/7",
                    description: "Une assistance dédiée vous accompagne à chaque étape de votre trajet, où que vous soyez.",
                  ),
                  _buildEngagementItem(
                    icon: Icons.auto_awesome_outlined,
                    title: "Expérience Sur-Mesure",
                    description: "Chauffeur privé, accueil VIP à l'aéroport ou location longue durée : nous nous adaptons à vous.",
                  ),
                  
                  const SizedBox(height: 32),
                  _buildSectionTitle("Contact Officiel"),
                  const SizedBox(height: 16),
                  _buildPremiumCard(
                    child: Column(
                      children: [
                        _buildContactRow(Icons.location_on_outlined, "Riviera 2, Cocody, Abidjan"),
                        const Divider(height: 30),
                        _buildContactRow(Icons.phone_android_rounded, "01 42 43 37 63"),
                        const Divider(height: 30),
                        _buildContactRow(Icons.email_outlined, "contact@roadstar.ci"),
                      ],
                    ),
                  ),

                  const SizedBox(height: 40),
                  Center(
                    child: Column(
                      children: [
                        Text(
                          "ROADSTAR MOTOR CI",
                          style: GoogleFonts.outfit(
                            fontWeight: FontWeight.bold,
                            color: Colors.grey.shade400,
                            letterSpacing: 2,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          "Version Excellence 1.0.1",
                          style: TextStyle(color: Colors.grey.shade400, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: GoogleFonts.outfit(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.black87,
      ),
    );
  }

  Widget _buildPremiumCard({required Widget child}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 15,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: child,
    );
  }

  Widget _buildEngagementItem({required IconData icon, required String title, required String description}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFF5722).withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(15),
            ),
            child: Icon(icon, color: const Color(0xFFFF5722), size: 26),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: TextStyle(color: Colors.grey.shade600, fontSize: 13, height: 1.5),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactRow(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, color: const Color(0xFFFF5722), size: 22),
        const SizedBox(width: 15),
        Text(
          text,
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
        ),
      ],
    );
  }
}
