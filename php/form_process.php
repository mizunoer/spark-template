<?php
/**
 * Form mail handler — Mythic Rx
 * Delivery address is dev@mythic-rx.com. Public-facing "From" uses info@mythic-rx.com (site contact).
 * Requires PHP on the server (cPanel). Uses mail(); ensure hosting allows outbound mail.
 */
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'error';
    exit;
}

header('Content-Type: text/plain; charset=UTF-8');

// Where form notifications are delivered (not shown on the public site)
$mailTo = 'dev@mythic-rx.com';

// Must match your domain; many hosts reject arbitrary From: addresses
$fromAddress = 'info@mythic-rx.com';
$fromName = 'Mythic Rx Website';

if (isset($_POST['action']) && $_POST['action'] === 'subscribe') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    if ($email === '') {
        echo 'error';
        exit;
    }
    $subject = "Newsletter Subscription Request - Mythic Rx";
    $headers = "From: {$fromName} <{$fromAddress}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $messageBody = "Newsletter subscription request<br>Email: " . htmlspecialchars($email);

    if (@mail($mailTo, $subject, $messageBody, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject_field = isset($_POST['subject']) ? trim($_POST['subject']) : 'other';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$contact_name = isset($_POST['contact_name']) ? trim($_POST['contact_name']) : '';
$prescriber = isset($_POST['prescriber']) ? trim($_POST['prescriber']) : '';
$npi = isset($_POST['npi']) ? trim($_POST['npi']) : '';
$states = isset($_POST['states']) ? trim($_POST['states']) : '';

if ($email === '') {
    echo 'error';
    exit;
}

$subject_map = [
    'new_provider' => 'New Provider Enrollment Request - Mythic Rx',
    'prescription' => 'Prescription Submission / Portal Help - Mythic Rx',
    'formulation' => 'Formulation Question (Pharmacist) - Mythic Rx',
    'shipping' => 'Shipping / Tracking Inquiry - Mythic Rx',
    'documentation' => 'Documentation Request - Mythic Rx',
    'billing' => 'Billing Inquiry - Mythic Rx',
    'other' => 'General Inquiry - Mythic Rx'
];

if (!empty($contact_name) || !empty($prescriber)) {
    $subject = 'New Provider Enrollment Request - Mythic Rx';
} else {
    $subject = isset($subject_map[$subject_field]) ? $subject_map[$subject_field] : 'Contact Form Submission - Mythic Rx';
}

$headers = "From: {$fromName} <{$fromAddress}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

$messageBody = "<h3>Contact Form Submission</h3>";
if ($name !== '') {
    $messageBody .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
}
if ($contact_name !== '') {
    $messageBody .= "<p><strong>Primary Contact:</strong> " . htmlspecialchars($contact_name) . "</p>";
}
$messageBody .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
if ($phone !== '') {
    $messageBody .= "<p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>";
}
if ($prescriber !== '') {
    $messageBody .= "<p><strong>Prescriber Name:</strong> " . htmlspecialchars($prescriber) . "</p>";
}
if ($npi !== '') {
    $messageBody .= "<p><strong>NPI:</strong> " . htmlspecialchars($npi) . "</p>";
}
if ($states !== '') {
    $messageBody .= "<p><strong>States Served/Requested:</strong> " . htmlspecialchars($states) . "</p>";
}
if ($subject_field !== '' && $subject_field !== 'other') {
    $subject_labels = [
        'new_provider' => 'New Provider Enrollment',
        'prescription' => 'Prescription Submission / Portal Help',
        'formulation' => 'Formulation Question (Pharmacist)',
        'shipping' => 'Shipping / Tracking',
        'documentation' => 'Documentation Request',
        'billing' => 'Billing'
    ];
    $subject_label = isset($subject_labels[$subject_field]) ? $subject_labels[$subject_field] : htmlspecialchars($subject_field);
    $messageBody .= "<p><strong>Subject:</strong> {$subject_label}</p>";
}
if ($message !== '') {
    $messageBody .= "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
}

$messageBody .= "<hr><p><small>Submitted: " . date('Y-m-d H:i:s') . "</small></p>";

if (@mail($mailTo, $subject, $messageBody, $headers)) {
    echo 'success';
} else {
    echo 'error';
}
