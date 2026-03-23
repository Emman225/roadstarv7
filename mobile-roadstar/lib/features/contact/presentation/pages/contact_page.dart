import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../providers/contact_provider.dart';

class ContactPage extends StatefulWidget {
  final int? vehicleId;
  final String? vehicleName;

  const ContactPage({super.key, this.vehicleId, this.vehicleName});

  @override
  State<ContactPage> createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _messageController = TextEditingController();

  bool get _isReservation => widget.vehicleId != null;

  @override
  void initState() {
    super.initState();
    if (_isReservation) {
      _messageController.text = "Bonjour, je souhaite réserver le véhicule : ${widget.vehicleName}. Merci de me recontacter.";
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      final provider = context.read<ContactProvider>();
      if (_isReservation) {
        provider.sendReservation(
          name: _nameController.text,
          email: _emailController.text,
          phone: _phoneController.text,
          message: _messageController.text,
          vehicleId: widget.vehicleId,
          vehicleName: widget.vehicleName,
        );
      } else {
        provider.sendMessage(
          name: _nameController.text,
          email: _emailController.text,
          phone: _phoneController.text,
          message: _messageController.text,
        );
      }
    }
  }

  Future<void> _makePhoneCall(String phoneNumber) async {
    final Uri launchUri = Uri(
      scheme: 'tel',
      path: phoneNumber,
    );
    try {
      if (await canLaunchUrl(launchUri)) {
        await launchUrl(launchUri);
      } else {
        // Fallback or force launch
        await launchUrl(launchUri);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Action impossible sur cet appareil")),
        );
      }
    }
  }

  Future<void> _openWhatsApp(String phoneNumber) async {
    final cleanPhone = phoneNumber.replaceAll(RegExp(r'\s+'), '').replaceAll('+', '');
    final Uri whatsappUri = Uri.parse("https://wa.me/$cleanPhone");
    
    try {
      // Try universal link first
      bool launched = await launchUrl(whatsappUri, mode: LaunchMode.externalApplication);
      if (!launched) {
        // Try direct scheme if universal link failed
        final Uri directUri = Uri.parse("whatsapp://send?phone=$cleanPhone");
        await launchUrl(directUri);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("WhatsApp n'est pas installé sur votre appareil")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Color(0xFFFF5722);
    
    return Scaffold(
      backgroundColor: const Color(0xFFF4F6F8), // Subtle grey-blue background for the screen
      body: Consumer<ContactProvider>(
        builder: (context, provider, child) {
          if (provider.isSuccess) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              _showFeedbackDialog(
                context, 
                "Succès", 
                "Votre demande a été envoyée avec succès !", 
                Icons.check_circle_outline, 
                Colors.green
              );
              provider.resetState();
              _nameController.clear();
              _emailController.clear();
              _phoneController.clear();
              _messageController.clear();
            });
          }

          if (provider.error != null) {
             WidgetsBinding.instance.addPostFrameCallback((_) {
              _showFeedbackDialog(
                context, 
                "Erreur", 
                provider.error ?? "Une erreur est survenue", 
                Icons.error_outline, 
                Colors.red
              );
              provider.resetState();
            });
          }

          return CustomScrollView(
            slivers: [
              // Hero AppBar
              SliverAppBar(
                expandedHeight: 200,
                pinned: true,
                stretch: true,
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
                  title: Text(
                    _isReservation ? 'Réservation' : 'Nous Contacter',
                    style: GoogleFonts.outfit(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
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
                              Colors.black.withValues(alpha: 0.3),
                              primaryColor.withValues(alpha: 0.8),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Content
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(20, 24, 20, 120), // Increased bottom padding to 120
                      child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (!_isReservation) ...[
                        Text(
                          "Parlons de votre projet",
                          style: GoogleFonts.outfit(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          "Notre équipe est là pour vous accompagner dans tous vos besoins de mobilité.",
                          style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
                        ),
                        const SizedBox(height: 24),

                        // Contact Cards
                        Row(
                          children: [
                            Expanded(
                              child: GestureDetector(
                                onTap: () => _makePhoneCall("+2250142433763"),
                                child: _buildQuickActionCard(
                                  Icons.phone_in_talk, 
                                  "Appeler", 
                                  "Assistance 24/7",
                                  backgroundColor: Colors.white,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: GestureDetector(
                                onTap: () => _openWhatsApp("+2250142433763"),
                                child: _buildQuickActionCard(
                                  Icons.chat_bubble_outline, 
                                  "WhatsApp", 
                                  "Réponse rapide",
                                  backgroundColor: Colors.white,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        
                        _buildContactInfoCard(backgroundColor: Colors.white),
                        const SizedBox(height: 32),
                      ],

                      // Form Container
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white, // White card over grey background
                          borderRadius: BorderRadius.circular(24),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.1),
                              blurRadius: 20,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        padding: const EdgeInsets.all(20),
                        child: Form(
                          key: _formKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    width: 4,
                                    height: 20,
                                    decoration: BoxDecoration(
                                      color: primaryColor,
                                      borderRadius: BorderRadius.circular(2),
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  Text(
                                    _isReservation ? "Détails" : "Formulaire",
                                    style: GoogleFonts.outfit(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 20),
                  
                              // All fields aligned vertically (full width)
                              _buildTextField(
                                controller: _nameController,
                                label: "Nom complet",
                                icon: Icons.person_outline,
                                validator: (val) => val == null || val.isEmpty ? 'Veuillez entrer votre nom' : null,
                              ),
                              const SizedBox(height: 12),
                              
                              _buildTextField(
                                controller: _phoneController,
                                label: "Numéro de téléphone",
                                icon: Icons.phone_android_outlined,
                                keyboardType: TextInputType.phone,
                                validator: (val) => val == null || val.isEmpty ? 'Requis' : null,
                              ),
                              const SizedBox(height: 12),
                              
                              _buildTextField(
                                controller: _emailController,
                                label: "Adresse Email",
                                icon: Icons.alternate_email,
                                keyboardType: TextInputType.emailAddress,
                                validator: (val) {
                                  if (val == null || val.isEmpty) return 'L\'email est requis';
                                  if (!val.contains('@')) return 'Email invalide';
                                  return null;
                                },
                              ),
                              const SizedBox(height: 12),
                              
                              _buildTextField(
                                controller: _messageController,
                                label: "Comment pouvons-nous vous aider ?",
                                icon: Icons.chat_outlined,
                                maxLines: 4,
                                validator: (val) => val == null || val.isEmpty ? 'Veuillez saisir votre message' : null,
                              ),
                              
                              const SizedBox(height: 24),
                              
                              SizedBox(
                                width: double.infinity,
                                child: ElevatedButton(
                                  onPressed: provider.isLoading ? null : _submitForm,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: primaryColor,
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(vertical: 16),
                                    elevation: 2,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                  ),
                                  child: provider.isLoading 
                                    ? const SizedBox(
                                        height: 20, width: 20, 
                                        child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)
                                      )
                                    : Text(
                                        _isReservation ? "CONFIRMER MA RÉSERVATION" : "ENVOYER LE MESSAGE", 
                                        style: const TextStyle(fontWeight: FontWeight.bold, letterSpacing: 0.5),
                                      ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildQuickActionCard(IconData icon, String title, String subtitle, {required Color backgroundColor}) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 12),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: const Color(0xFFFF5722).withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: const Color(0xFFFF5722), size: 28),
          ),
          const SizedBox(height: 12),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 6),
          Text(subtitle, textAlign: TextAlign.center, style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildContactInfoCard({required Color backgroundColor}) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          _buildInfoRow(
            Icons.access_time_filled_outlined, 
            "Assistance 24h/24 & 7j/7", 
            "Disponible en tout temps",
          ),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 16),
            child: Divider(height: 1),
          ),
          InkWell(
            onTap: () => _makePhoneCall("+2250142433763"),
            child: _buildInfoRow(
              Icons.phone_android, 
              "01 42 43 37 63", 
              "Appel commercial",
            ),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 16),
            child: Divider(height: 1),
          ),
          _buildInfoRow(
            Icons.email_outlined, 
            "contact@roadstar.ci", 
            "Réponse sous 24h",
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String title, String subtitle) {
    return Row(
      children: [
        Icon(icon, color: const Color(0xFFFF5722), size: 24),
        const SizedBox(width: 16),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            Text(subtitle, style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
          ],
        ),
      ],
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    int maxLines = 1,
    TextInputType? keyboardType,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      maxLines: maxLines,
      keyboardType: keyboardType,
      validator: validator,
      style: const TextStyle(fontSize: 13),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: Colors.grey.shade600, fontSize: 12),
        prefixIcon: Icon(icon, size: 18, color: Colors.grey.shade400),
        filled: true,
        isDense: true,
        fillColor: Colors.grey.shade50,
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Color(0xFFFF5722), width: 1),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Colors.redAccent, width: 1),
        ),
      ),
    );
  }

  void _showFeedbackDialog(BuildContext context, String title, String message, IconData icon, Color color) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(height: 8),
              Icon(icon, color: color, size: 60),
              const SizedBox(height: 16),
              Text(
                title, 
                style: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold)
              ),
              const SizedBox(height: 8),
              Text(
                message, 
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: color,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text("OK", style: TextStyle(color: Colors.white)),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

