<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['action']) and $_POST['action'] === 'subscribe') {
        $email = $_POST["email"];
        $subject = "Newsletter Subscription Request - Mythic Rx";
        $to = "info@mythic-rx.com"; // Contact form submissions
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-type: text/html\r\n";
        $message = "Newsletter subscription request from: " . $email;

        $messageBody = "Email: $email<br>Message: $message";

        if (mail($to, $subject, $messageBody, $headers)) {
            echo "success"; // Send response Success
        } else {
            echo "error"; // Send Response Failed Send Mail
        }
    } else {
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';
        $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
        $subject_field = isset($_POST['subject']) ? $_POST['subject'] : 'General Inquiry';
        $message = isset($_POST['message']) ? $_POST['message'] : '';
        $contact_name = isset($_POST['contact_name']) ? $_POST['contact_name'] : '';
        $prescriber = isset($_POST['prescriber']) ? $_POST['prescriber'] : '';
        $npi = isset($_POST['npi']) ? $_POST['npi'] : '';
        $states = isset($_POST['states']) ? $_POST['states'] : '';
        
        // Determine subject line based on form type and subject field
        $subject_map = [
            'new_provider' => 'New Provider Enrollment Request - Mythic Rx',
            'prescription' => 'Prescription Submission / Portal Help - Mythic Rx',
            'formulation' => 'Formulation Question (Pharmacist) - Mythic Rx',
            'shipping' => 'Shipping / Tracking Inquiry - Mythic Rx',
            'documentation' => 'Documentation Request - Mythic Rx',
            'billing' => 'Billing Inquiry - Mythic Rx',
            'other' => 'General Inquiry - Mythic Rx'
        ];
        
        // Check if this is a provider enrollment form (has contact_name or prescriber fields)
        if (!empty($contact_name) || !empty($prescriber)) {
            $subject = 'New Provider Enrollment Request - Mythic Rx';
        } else {
            $subject = isset($subject_map[$subject_field]) ? $subject_map[$subject_field] : 'Contact Form Submission - Mythic Rx';
        }

        $to = "info@mythic-rx.com"; // Contact form submissions
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-type: text/html\r\n";

        // Build comprehensive message body
        $messageBody = "<h3>Contact Form Submission</h3>";
        if (!empty($name)) $messageBody .= "<p><strong>Name:</strong> $name</p>";
        if (!empty($contact_name)) $messageBody .= "<p><strong>Primary Contact:</strong> $contact_name</p>";
        if (!empty($email)) $messageBody .= "<p><strong>Email:</strong> $email</p>";
        if (!empty($phone)) $messageBody .= "<p><strong>Phone:</strong> $phone</p>";
        if (!empty($prescriber)) $messageBody .= "<p><strong>Prescriber Name:</strong> $prescriber</p>";
        if (!empty($npi)) $messageBody .= "<p><strong>NPI:</strong> $npi</p>";
        if (!empty($states)) $messageBody .= "<p><strong>States Served/Requested:</strong> $states</p>";
        if (!empty($subject_field) && $subject_field !== 'other') {
            $subject_labels = [
                'new_provider' => 'New Provider Enrollment',
                'prescription' => 'Prescription Submission / Portal Help',
                'formulation' => 'Formulation Question (Pharmacist)',
                'shipping' => 'Shipping / Tracking',
                'documentation' => 'Documentation Request',
                'billing' => 'Billing'
            ];
            $subject_label = isset($subject_labels[$subject_field]) ? $subject_labels[$subject_field] : $subject_field;
            $messageBody .= "<p><strong>Subject:</strong> $subject_label</p>";
        }
        if (!empty($message)) $messageBody .= "<p><strong>Message:</strong><br>$message</p>";
        
        $messageBody .= "<hr><p><small>Submitted: " . date('Y-m-d H:i:s') . "</small></p>";

        if (mail($to, $subject, $messageBody, $headers)) {
            echo "success"; // Send response Success
        } else {
            echo "error"; // Send Response Failed Send Mail
        }
    }
}
