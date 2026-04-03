"""Server-side translations for user-facing API strings and emails."""

SUPPORTED_LANGUAGES = ["en", "fr", "zh", "hi", "es"]

TRANSLATIONS = {
    "en": {
        "errors": {
            "not_found": "Resource not found",
            "unauthorized": "You are not authorized to access this resource",
            "payment_failed": "Payment could not be verified",
            "invalid_file_type": "File type not allowed for this product type",
            "file_too_large": "File exceeds the maximum allowed size of 2 GB",
            "order_already_fulfilled": "This order has already been processed",
            "product_no_files": "Cannot publish a product with no files uploaded",
            "invalid_coupon": "This coupon code is invalid or has expired",
            "server_error": "An internal server error occurred",
            "session_expired": "Your session has expired; please log in again",
            "email_registered": "Email already registered",
            "invalid_credentials": "Incorrect email or password",
            "inactive_user": "Inactive user",
            "email_not_verified": "Email not verified. Please verify your email before logging in.",
            "invalid_verification_token": "Invalid verification token",
            "verification_expired": "Verification token has expired",
            "invalid_refresh": "Invalid or expired refresh token",
            "user_not_found": "User not found",
            "product_not_found": "Product not found",
            "order_not_found": "Order not found",
            "forbidden_order": "Not authorized to view this order",
            "forbidden_payment": "Not authorized to process payment for this order",
            "forbidden_download": "Not authorized to access this order",
            "payment_incomplete": "Order payment not completed",
            "file_not_found": "File not found",
            "file_not_found_on_server": "File not found on server",
            "invalid_reset_token": "Invalid or expired reset token",
            "language_invalid": "Unsupported language code",
            "review_exists": "You have already reviewed this product",
            "review_not_found": "Review not found",
            "review_edit_forbidden": "Not allowed to edit this review",
            "review_no_updates": "No fields to update",
            "review_delete_forbidden": "Not allowed to delete this review",
            "out_of_stock": "Product out of stock",
            "credentials_invalid": "Could not validate credentials",
            "rate_limit_verification": "Please wait {seconds}s before requesting another verification email.",
            "rate_limit_reset": "Please wait {seconds}s before requesting another reset email.",
            "email_delivery_verification": (
                "Could not deliver verification email. Check SMTP host, port (587 STARTTLS or 465 SSL), "
                "and credentials (e.g. Gmail needs an app password). The server log has the provider error."
            ),
            "email_delivery_verification_short": "Could not deliver verification email. Check SMTP settings and see server logs.",
            "email_delivery_reset": "Could not deliver reset email. Check SMTP settings and see server logs.",
            "invalid_refresh_sub": "Invalid refresh token",
            "email_not_verified_short": "Email not verified",
            "not_enough_permissions": "Not enough permissions",
        },
        "emails": {
            "welcome_subject": "Welcome to VetLearn",
            "welcome_body": "Hi {name}, welcome to VetLearn! You can now browse and purchase veterinary educational content.",
            "purchase_subject": "Your VetLearn purchase is confirmed",
            "purchase_body": "Hi {name}, you now have access to {product}. Visit your library to start learning.",
            "reset_subject": "Reset your VetLearn password",
            "reset_body": "Hi {name}, click the link below to reset your password. This link expires in 1 hour: {link}",
            "verify_subject": "Verify your VetLearn account",
            "verify_body": (
                "Hi {name},\n\n"
                "Please verify your email by clicking the link below:\n{link}\n\n"
                "This link expires in 24 hours.\n"
                "If you did not create this account, you can ignore this email."
            ),
        },
        "success": {
            "order_fulfilled": "Order fulfilled successfully",
            "product_published": "Product is now live on the storefront",
            "account_created": "Account created successfully. Please verify your email.",
            "language_updated": "Language preference updated",
            "register_complete": "Registration successful. Please verify your email before logging in.",
            "email_verified": "Email verified successfully. You can now log in.",
            "email_already_verified": "Email already verified",
            "password_updated": "Password updated successfully. You can now log in.",
            "resend_verification_generic": (
                "If this account exists and is not verified, a verification email has been sent."
            ),
            "forgot_password_generic": (
                "If an account exists for this email, a password reset link has been sent."
            ),
            "payment_processed": "Payment processed successfully",
        },
    },
    "fr": {
        "errors": {
            "not_found": "Ressource introuvable",
            "unauthorized": "Vous n'êtes pas autorisé à accéder à cette ressource",
            "payment_failed": "Le paiement n'a pas pu être vérifié",
            "invalid_file_type": "Type de fichier non autorisé pour ce type de produit",
            "file_too_large": "Le fichier dépasse la taille maximale autorisée de 2 Go",
            "order_already_fulfilled": "Cette commande a déjà été traitée",
            "product_no_files": "Impossible de publier un produit sans fichiers",
            "invalid_coupon": "Ce code de réduction est invalide ou a expiré",
            "server_error": "Une erreur interne du serveur s'est produite",
            "session_expired": "Votre session a expiré, veuillez vous reconnecter",
            "email_registered": "Cette adresse e-mail est déjà enregistrée",
            "invalid_credentials": "E-mail ou mot de passe incorrect",
            "inactive_user": "Utilisateur inactif",
            "email_not_verified": "E-mail non vérifié. Veuillez vérifier votre e-mail avant de vous connecter.",
            "invalid_verification_token": "Jeton de vérification invalide",
            "verification_expired": "Le jeton de vérification a expiré",
            "invalid_refresh": "Jeton d'actualisation invalide ou expiré",
            "user_not_found": "Utilisateur introuvable",
            "product_not_found": "Produit introuvable",
            "order_not_found": "Commande introuvable",
            "forbidden_order": "Non autorisé à voir cette commande",
            "forbidden_payment": "Non autorisé à traiter le paiement pour cette commande",
            "forbidden_download": "Non autorisé à accéder à cette commande",
            "payment_incomplete": "Paiement de la commande non terminé",
            "file_not_found": "Fichier introuvable",
            "file_not_found_on_server": "Fichier introuvable sur le serveur",
            "invalid_reset_token": "Jeton de réinitialisation invalide ou expiré",
            "language_invalid": "Code de langue non pris en charge",
            "review_exists": "Vous avez déjà évalué ce produit",
            "review_not_found": "Avis introuvable",
            "review_edit_forbidden": "Modification de cet avis non autorisée",
            "review_no_updates": "Aucun champ à mettre à jour",
            "review_delete_forbidden": "Suppression de cet avis non autorisée",
            "out_of_stock": "Produit en rupture de stock",
            "credentials_invalid": "Impossible de valider les identifiants",
            "rate_limit_verification": "Veuillez attendre {seconds}s avant une nouvelle demande d'e-mail de vérification.",
            "rate_limit_reset": "Veuillez attendre {seconds}s avant une nouvelle demande d'e-mail de réinitialisation.",
            "email_delivery_verification": (
                "Impossible d'envoyer l'e-mail de vérification. Vérifiez SMTP, le port (587 STARTTLS ou 465 SSL) "
                "et les identifiants. Le journal du serveur contient l'erreur du fournisseur."
            ),
            "email_delivery_verification_short": "Impossible d'envoyer l'e-mail de vérification. Vérifiez SMTP et les journaux.",
            "email_delivery_reset": "Impossible d'envoyer l'e-mail de réinitialisation. Vérifiez SMTP et les journaux.",
            "invalid_refresh_sub": "Jeton d'actualisation non valide",
            "email_not_verified_short": "E-mail non vérifié",
            "not_enough_permissions": "Permissions insuffisantes",
        },
        "emails": {
            "welcome_subject": "Bienvenue sur VetLearn",
            "welcome_body": "Bonjour {name}, bienvenue sur VetLearn ! Vous pouvez parcourir et acheter du contenu vétérinaire.",
            "purchase_subject": "Votre achat VetLearn est confirmé",
            "purchase_body": "Bonjour {name}, vous avez maintenant accès à {product}. Consultez votre bibliothèque.",
            "reset_subject": "Réinitialisez votre mot de passe VetLearn",
            "reset_body": "Bonjour {name}, cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe. Expire dans 1 heure : {link}",
            "verify_subject": "Vérifiez votre compte VetLearn",
            "verify_body": (
                "Bonjour {name},\n\n"
                "Veuillez vérifier votre e-mail en cliquant sur le lien ci-dessous :\n{link}\n\n"
                "Ce lien expire dans 24 heures.\n"
                "Si vous n'avez pas créé ce compte, ignorez cet e-mail."
            ),
        },
        "success": {
            "order_fulfilled": "Commande traitée avec succès",
            "product_published": "Le produit est maintenant en ligne",
            "account_created": "Compte créé avec succès. Veuillez vérifier votre e-mail.",
            "language_updated": "Préférence de langue mise à jour",
            "register_complete": "Inscription réussie. Veuillez vérifier votre e-mail avant de vous connecter.",
            "email_verified": "E-mail vérifié. Vous pouvez maintenant vous connecter.",
            "email_already_verified": "E-mail déjà vérifié",
            "password_updated": "Mot de passe mis à jour. Vous pouvez maintenant vous connecter.",
            "resend_verification_generic": (
                "Si ce compte existe et n'est pas vérifié, un e-mail de vérification a été envoyé."
            ),
            "forgot_password_generic": (
                "Si un compte existe pour cet e-mail, un lien de réinitialisation a été envoyé."
            ),
            "payment_processed": "Paiement traité avec succès",
        },
    },
    "zh": {
        "errors": {
            "not_found": "未找到资源",
            "unauthorized": "您无权访问此资源",
            "payment_failed": "无法验证付款",
            "invalid_file_type": "此产品类型不允许该文件格式",
            "file_too_large": "文件超过最大限制 2 GB",
            "order_already_fulfilled": "该订单已处理",
            "product_no_files": "没有上传文件无法发布产品",
            "invalid_coupon": "优惠码无效或已过期",
            "server_error": "服务器内部错误",
            "session_expired": "会话已过期，请重新登录",
            "email_registered": "该邮箱已注册",
            "invalid_credentials": "邮箱或密码错误",
            "inactive_user": "账户已停用",
            "email_not_verified": "请先验证邮箱后再登录。",
            "invalid_verification_token": "验证令牌无效",
            "verification_expired": "验证令牌已过期",
            "invalid_refresh": "刷新令牌无效或已过期",
            "user_not_found": "未找到用户",
            "product_not_found": "未找到产品",
            "order_not_found": "未找到订单",
            "forbidden_order": "无权查看此订单",
            "forbidden_payment": "无权处理此订单付款",
            "forbidden_download": "无权访问此订单",
            "payment_incomplete": "订单未完成付款",
            "file_not_found": "未找到文件",
            "file_not_found_on_server": "服务器上未找到文件",
            "invalid_reset_token": "重置链接无效或已过期",
            "language_invalid": "不支持的语言代码",
            "review_exists": "您已评价过该产品",
            "review_not_found": "未找到评价",
            "review_edit_forbidden": "无权编辑此评价",
            "review_no_updates": "没有要更新的字段",
            "review_delete_forbidden": "无权删除此评价",
            "out_of_stock": "产品缺货",
            "credentials_invalid": "无法验证凭据",
            "rate_limit_verification": "请等待 {seconds} 秒后再申请验证邮件。",
            "rate_limit_reset": "请等待 {seconds} 秒后再申请重置邮件。",
            "email_delivery_verification": (
                "无法发送验证邮件。请检查 SMTP 主机、端口（587 STARTTLS 或 465 SSL）和凭据。"
                "服务器日志中有提供商错误信息。"
            ),
            "email_delivery_verification_short": "无法发送验证邮件。请检查 SMTP 设置并查看服务器日志。",
            "email_delivery_reset": "无法发送重置邮件。请检查 SMTP 设置并查看服务器日志。",
            "invalid_refresh_sub": "刷新令牌无效",
            "email_not_verified_short": "邮箱未验证",
            "not_enough_permissions": "权限不足",
        },
        "emails": {
            "welcome_subject": "欢迎使用 VetLearn",
            "welcome_body": "您好 {name}，欢迎加入 VetLearn！您现在可以浏览和购买兽医教育内容。",
            "purchase_subject": "您的 VetLearn 购买已确认",
            "purchase_body": "您好 {name}，您已获得 {product} 的访问权限。请前往书库开始学习。",
            "reset_subject": "重置您的 VetLearn 密码",
            "reset_body": "您好 {name}，请点击以下链接重置密码（1 小时内有效）：{link}",
            "verify_subject": "验证您的 VetLearn 账户",
            "verify_body": (
                "您好 {name}，\n\n"
                "请点击以下链接验证您的邮箱：\n{link}\n\n"
                "链接 24 小时内有效。\n"
                "如非本人注册，请忽略此邮件。"
            ),
        },
        "success": {
            "order_fulfilled": "订单已成功完成",
            "product_published": "产品现已上架",
            "account_created": "账户创建成功，请验证您的邮箱。",
            "language_updated": "语言偏好已更新",
            "register_complete": "注册成功。登录前请先验证邮箱。",
            "email_verified": "邮箱验证成功，您现在可以登录。",
            "email_already_verified": "邮箱已验证",
            "password_updated": "密码已更新，您现在可以登录。",
            "resend_verification_generic": "若账户存在且未验证，我们已发送验证邮件。",
            "forgot_password_generic": "若该邮箱存在账户，我们已发送密码重置链接。",
            "payment_processed": "付款已成功处理",
        },
    },
    "hi": {
        "errors": {
            "not_found": "संसाधन नहीं मिला",
            "unauthorized": "आपके पास इस संसाधन तक पहुँच नहीं है",
            "payment_failed": "भुगतान सत्यापित नहीं हो सका",
            "invalid_file_type": "इस उत्पाद प्रकार के लिए फ़ाइल प्रकार अनुमत नहीं",
            "file_too_large": "फ़ाइल अधिकतम आकार 2 GB से अधिक है",
            "order_already_fulfilled": "यह ऑर्डर पहले ही संसाधित हो चुका है",
            "product_no_files": "बिना फ़ाइल के उत्पाद प्रकाशित नहीं कर सकते",
            "invalid_coupon": "यह कूपन अमान्य या समाप्त है",
            "server_error": "आंतरिक सर्वर त्रुटि",
            "session_expired": "सत्र समाप्त; कृपया पुनः लॉग इन करें",
            "email_registered": "ईमेल पहले से पंजीकृत है",
            "invalid_credentials": "गलत ईमेल या पासवर्ड",
            "inactive_user": "निष्क्रिय उपयोगकर्ता",
            "email_not_verified": "ईमेल सत्यापित नहीं। लॉग इन से पहले सत्यापित करें।",
            "invalid_verification_token": "अमान्य सत्यापन टोकन",
            "verification_expired": "सत्यापन टोकन समाप्त",
            "invalid_refresh": "अमान्य या समाप्त रीफ़्रेश टोकन",
            "user_not_found": "उपयोगकर्ता नहीं मिला",
            "product_not_found": "उत्पाद नहीं मिला",
            "order_not_found": "ऑर्डर नहीं मिला",
            "forbidden_order": "इस ऑर्डर को देखने की अनुमति नहीं",
            "forbidden_payment": "इस ऑर्डर के लिए भुगतान की अनुमति नहीं",
            "forbidden_download": "इस ऑर्डर तक पहुँच की अनुमति नहीं",
            "payment_incomplete": "ऑर्डर भुगतान अधूरा",
            "file_not_found": "फ़ाइल नहीं मिली",
            "file_not_found_on_server": "सर्वर पर फ़ाइल नहीं मिली",
            "invalid_reset_token": "रीसेट लिंक अमान्य या समाप्त",
            "language_invalid": "असमर्थित भाषा कोड",
            "review_exists": "आप पहले ही इस उत्पाद की समीक्षा कर चुके हैं",
            "review_not_found": "समीक्षा नहीं मिली",
            "review_edit_forbidden": "इस समीक्षा को संपादित करने की अनुमति नहीं",
            "review_no_updates": "अपडेट करने के लिए कोई फ़ील्ड नहीं",
            "review_delete_forbidden": "इस समीक्षा को हटाने की अनुमति नहीं",
            "out_of_stock": "उत्पाद स्टॉक में नहीं",
            "credentials_invalid": "क्रेडेंशियल सत्यापित नहीं हो सके",
            "rate_limit_verification": "कृपया {seconds} सेकंड बाद फिर सत्यापन ईमेल माँगें।",
            "rate_limit_reset": "कृपया {seconds} सेकंड बाद फिर रीसेट ईमेल माँगें।",
            "email_delivery_verification": (
                "सत्यापन ईमेल नहीं भेजा जा सका। SMTP होस्ट, पोर्ट (587 STARTTLS या 465 SSL) "
                "और क्रेडेंशियल जाँचें। सर्वर लॉग में प्रदाता त्रुटि है।"
            ),
            "email_delivery_verification_short": "सत्यापन ईमेल नहीं भेजा जा सका। SMTP व लॉग जाँचें।",
            "email_delivery_reset": "रीसेट ईमेल नहीं भेजा जा सका। SMTP व लॉग जाँचें।",
            "invalid_refresh_sub": "अमान्य रीफ़्रेश टोकन",
            "email_not_verified_short": "ईमेल सत्यापित नहीं",
            "not_enough_permissions": "पर्याप्त अनुमति नहीं",
        },
        "emails": {
            "welcome_subject": "VetLearn में आपका स्वागत है",
            "welcome_body": "नमस्ते {name}, VetLearn में आपका स्वागत है! अब आप पशु चिकित्सा शैक्षिक सामग्री खरीद सकते हैं।",
            "purchase_subject": "आपकी VetLearn खरीद की पुष्टि",
            "purchase_body": "नमस्ते {name}, अब आपके पास {product} तक पहुँच है। अपनी लाइब्रेरी देखें।",
            "reset_subject": "अपना VetLearn पासवर्ड रीसेट करें",
            "reset_body": "नमस्ते {name}, पासवर्ड रीसेट करने के लिए लिंक पर क्लिक करें (1 घंटे में समाप्त): {link}",
            "verify_subject": "अपना VetLearn खाता सत्यापित करें",
            "verify_body": (
                "नमस्ते {name},\n\n"
                "अपना ईमेल सत्यापित करने के लिए नीचे लिंक पर क्लिक करें:\n{link}\n\n"
                "यह लिंक 24 घंटे में समाप्त होता है।\n"
                "यदि आपने खाता नहीं बनाया है, तो इसे नज़रअंदाज़ करें।"
            ),
        },
        "success": {
            "order_fulfilled": "ऑर्डर सफलतापूर्वक पूरा हुआ",
            "product_published": "उत्पाद अब स्टोर पर है",
            "account_created": "खाता सफलतापूर्वक बना। कृपया ईमेल सत्यापित करें।",
            "language_updated": "भाषा वरीयता अपडेट हुई",
            "register_complete": "पंजीकरण सफल। लॉग इन से पहले ईमेल सत्यापित करें।",
            "email_verified": "ईमेल सत्यापित। अब आप लॉग इन कर सकते हैं।",
            "email_already_verified": "ईमेल पहले से सत्यापित",
            "password_updated": "पासवर्ड अपडेट। अब आप लॉग इन कर सकते हैं।",
            "resend_verification_generic": "यदि खाता है और सत्यापित नहीं है, तो सत्यापन ईमेल भेजा गया।",
            "forgot_password_generic": "यदि इस ईमेल पर खाता है, तो पासवर्ड रीसेट लिंक भेजा गया।",
            "payment_processed": "भुगतान सफलतापूर्वक संसाधित",
        },
    },
    "es": {
        "errors": {
            "not_found": "Recurso no encontrado",
            "unauthorized": "No está autorizado para acceder a este recurso",
            "payment_failed": "No se pudo verificar el pago",
            "invalid_file_type": "Tipo de archivo no permitido para este producto",
            "file_too_large": "El archivo supera el tamaño máximo de 2 GB",
            "order_already_fulfilled": "Este pedido ya fue procesado",
            "product_no_files": "No se puede publicar un producto sin archivos",
            "invalid_coupon": "Este cupón no es válido o ha expirado",
            "server_error": "Error interno del servidor",
            "session_expired": "Su sesión ha expirado; inicie sesión de nuevo",
            "email_registered": "El correo ya está registrado",
            "invalid_credentials": "Correo o contraseña incorrectos",
            "inactive_user": "Usuario inactivo",
            "email_not_verified": "Correo no verificado. Verifíquelo antes de iniciar sesión.",
            "invalid_verification_token": "Token de verificación no válido",
            "verification_expired": "El token de verificación ha expirado",
            "invalid_refresh": "Token de actualización no válido o expirado",
            "user_not_found": "Usuario no encontrado",
            "product_not_found": "Producto no encontrado",
            "order_not_found": "Pedido no encontrado",
            "forbidden_order": "No autorizado para ver este pedido",
            "forbidden_payment": "No autorizado para procesar el pago",
            "forbidden_download": "No autorizado para acceder a este pedido",
            "payment_incomplete": "Pago del pedido incompleto",
            "file_not_found": "Archivo no encontrado",
            "file_not_found_on_server": "Archivo no encontrado en el servidor",
            "invalid_reset_token": "Enlace de restablecimiento no válido o expirado",
            "language_invalid": "Código de idioma no admitido",
            "review_exists": "Ya ha opinado sobre este producto",
            "review_not_found": "Reseña no encontrada",
            "review_edit_forbidden": "No puede editar esta reseña",
            "review_no_updates": "No hay campos para actualizar",
            "review_delete_forbidden": "No puede eliminar esta reseña",
            "out_of_stock": "Producto sin stock",
            "credentials_invalid": "No se pudieron validar las credenciales",
            "rate_limit_verification": "Espere {seconds}s antes de solicitar otro correo de verificación.",
            "rate_limit_reset": "Espere {seconds}s antes de solicitar otro correo de restablecimiento.",
            "email_delivery_verification": (
                "No se pudo enviar el correo de verificación. Revise SMTP, el puerto (587 STARTTLS o 465 SSL) "
                "y las credenciales. El registro del servidor tiene el error del proveedor."
            ),
            "email_delivery_verification_short": "No se pudo enviar el correo de verificación. Revise SMTP y los registros.",
            "email_delivery_reset": "No se pudo enviar el correo de restablecimiento. Revise SMTP y los registros.",
            "invalid_refresh_sub": "Token de actualización no válido",
            "email_not_verified_short": "Correo no verificado",
            "not_enough_permissions": "Permisos insuficientes",
        },
        "emails": {
            "welcome_subject": "Bienvenido a VetLearn",
            "welcome_body": "Hola {name}, bienvenido a VetLearn. Ya puede explorar y comprar contenido veterinario.",
            "purchase_subject": "Su compra en VetLearn está confirmada",
            "purchase_body": "Hola {name}, ya tiene acceso a {product}. Visite su biblioteca.",
            "reset_subject": "Restablezca su contraseña de VetLearn",
            "reset_body": "Hola {name}, haga clic en el enlace para restablecer su contraseña (expira en 1 hora): {link}",
            "verify_subject": "Verifique su cuenta VetLearn",
            "verify_body": (
                "Hola {name},\n\n"
                "Verifique su correo haciendo clic en el enlace:\n{link}\n\n"
                "El enlace caduca en 24 horas.\n"
                "Si no creó la cuenta, ignore este mensaje."
            ),
        },
        "success": {
            "order_fulfilled": "Pedido completado correctamente",
            "product_published": "El producto ya está publicado",
            "account_created": "Cuenta creada. Verifique su correo.",
            "language_updated": "Preferencia de idioma actualizada",
            "register_complete": "Registro correcto. Verifique su correo antes de iniciar sesión.",
            "email_verified": "Correo verificado. Ya puede iniciar sesión.",
            "email_already_verified": "Correo ya verificado",
            "password_updated": "Contraseña actualizada. Ya puede iniciar sesión.",
            "resend_verification_generic": (
                "Si la cuenta existe y no está verificada, se ha enviado un correo de verificación."
            ),
            "forgot_password_generic": (
                "Si existe una cuenta para este correo, se ha enviado un enlace de restablecimiento."
            ),
            "payment_processed": "Pago procesado correctamente",
        },
    },
}


def get_translation(key_path: str, lang: str = "en", **kwargs) -> str:
    if lang not in SUPPORTED_LANGUAGES:
        lang = "en"
    keys = key_path.split(".")
    result = TRANSLATIONS.get(lang)
    text = None
    try:
        for key in keys:
            if not isinstance(result, dict):
                result = None
                break
            result = result.get(key)
        text = result
    except (TypeError, AttributeError):
        text = None

    if not isinstance(text, str):
        result = TRANSLATIONS.get("en")
        try:
            for key in keys:
                result = result.get(key) if isinstance(result, dict) else None
            text = result if isinstance(result, str) else None
        except (TypeError, AttributeError):
            text = None

    if not isinstance(text, str):
        return key_path

    if kwargs:
        try:
            return text.format(**kwargs)
        except (KeyError, ValueError):
            return text
    return text
