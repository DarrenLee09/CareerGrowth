import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    At CareerBoost, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our resume builder and job search services.
                </p>
            </section>

            <section>
                <h2>2. Information We Collect</h2>
                <h3>2.1 Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us, including:</p>
                <ul>
                    <li>Name and contact information</li>
                    <li>Professional information</li>
                    <li>Resume content</li>
                    <li>Account credentials</li>
                </ul>

                <h3>2.2 Usage Data</h3>
                <p>We automatically collect certain information when you use our services:</p>
                <ul>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited</li>
                    <li>Time spent on our platform</li>
                </ul>
            </section>

            <section>
                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information for various purposes:</p>
                <ul>
                    <li>To provide and maintain our services</li>
                    <li>To improve and personalize your experience</li>
                    <li>To communicate with you about our services</li>
                    <li>To analyze and optimize our platform</li>
                </ul>
            </section>

            <section>
                <h2>4. Data Security</h2>
                <p>
                    We implement appropriate security measures to protect your personal information. However,
                    no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
            </section>

            <section>
                <h2>5. Data Sharing</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                    <li>Service providers who assist in our operations</li>
                    <li>Employers when you apply for jobs through our platform</li>
                    <li>Law enforcement when required by law</li>
                </ul>
            </section>

            <section>
                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                </ul>
            </section>

            <section>
                <h2>7. Cookies</h2>
                <p>
                    We use cookies and similar tracking technologies to track activity on our platform and
                    hold certain information. You can instruct your browser to refuse all cookies or to indicate
                    when a cookie is being sent.
                </p>
            </section>

            <section>
                <h2>8. Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by
                    posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
            </section>

            <section>
                <h2>9. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    Email: privacy@careerboost.com
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy; 