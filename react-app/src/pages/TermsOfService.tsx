import React from 'react';
import './TermsOfService.css';

const TermsOfService: React.FC = () => {
    return (
        <div className="terms-of-service-container">
            <h1>Terms of Service</h1>
            <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using CareerBoost, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.</p>
            </section>

            <section>
                <h2>2. Description of Service</h2>
                <p>CareerBoost provides a platform for job seekers to create, manage, and optimize their resumes, as well as connect with potential employers. Our service includes:</p>
                <ul>
                    <li>Resume creation and management</li>
                    <li>AI-powered resume optimization</li>
                    <li>Job search functionality</li>
                    <li>Professional networking features</li>
                </ul>
            </section>

            <section>
                <h2>3. User Accounts</h2>
                <p>To use our service, you must:</p>
                <ul>
                    <li>Be at least 18 years old</li>
                    <li>Register for an account with accurate information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                </ul>
            </section>

            <section>
                <h2>4. User Content</h2>
                <p>By posting content on CareerBoost, you:</p>
                <ul>
                    <li>Retain ownership of your content</li>
                    <li>Grant us a license to use, display, and distribute your content</li>
                    <li>Ensure your content does not violate any laws or rights</li>
                    <li>Are responsible for the accuracy of your content</li>
                </ul>
            </section>

            <section>
                <h2>5. Prohibited Activities</h2>
                <p>Users may not:</p>
                <ul>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Impersonate others or provide false information</li>
                    <li>Harass, abuse, or harm others</li>
                    <li>Share malicious content or software</li>
                    <li>Attempt to access unauthorized areas of the service</li>
                    <li>Interfere with the proper functioning of the service</li>
                </ul>
            </section>

            <section>
                <h2>6. Intellectual Property</h2>
                <p>All content, features, and functionality of CareerBoost, including but not limited to text, graphics, logos, and software, are the exclusive property of CareerBoost and are protected by U.S. and international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section>
                <h2>7. Limitation of Liability</h2>
                <p>CareerBoost shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
            </section>

            <section>
                <h2>8. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Continued use of the service after such changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
                <h2>9. Termination</h2>
                <p>We may terminate or suspend your account and access to the service immediately, without prior notice, for any violation of these terms or for any other reason.</p>
            </section>

            <section>
                <h2>10. Contact Information</h2>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <p>Email: legal@careerboost.com</p>
            </section>
        </div>
    );
};

export default TermsOfService; 