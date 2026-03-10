import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { useLanguage } from "../contexts/LanguageContext";
import { useActor } from "../hooks/useActor";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormData = { name: "", email: "", message: "" };

// Formspree endpoint configured for kharatchaitanya03@gmail.com
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgdjk";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { actor } = useActor();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = t("nameRequired");
    if (!form.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("invalidEmail");
    }
    if (!form.message.trim()) newErrors.message = t("messageRequired");
    else if (form.message.trim().length < 10)
      newErrors.message = t("messageTooShort");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    try {
      // Primary: Send via Formspree for email delivery
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errMsg =
          (data as { error?: string }).error ||
          "Failed to send message. Please try again or contact us directly.";
        throw new Error(errMsg);
      }

      // Secondary: Persist to backend (best-effort, does not affect email delivery)
      if (actor) {
        try {
          await actor.submitContact(trimmedName, trimmedEmail, trimmedMessage);
        } catch (backendErr) {
          console.error(
            "Backend persistence failed (non-critical):",
            backendErr,
          );
        }
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again or contact us directly.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t("email"),
      value: "kharatchaitanya03@gmail.com",
      href: "mailto:kharatchaitanya03@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t("phone"),
      value: "+91 8421016006",
      href: "tel:+918421016006",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t("address"),
      value: "Agro Crops HQ, Green Valley, India",
      href: null,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="gradient-green py-16 px-4 text-center">
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            📬 {t("contactPageTag")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
            {t("contactHeroTitle")}
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            {t("contactHeroSubtitle")}
          </p>
        </AnimatedSection>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection animation="slideInLeft">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 font-merriweather">
                    {t("contactInfoTitle")}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {t("contactInfoSubtitle")}
                  </p>
                </div>
              </AnimatedSection>

              {contactInfo.map((info, i) => (
                <AnimatedSection
                  key={info.label}
                  animation="slideInLeft"
                  delay={i * 100}
                >
                  <div className="flex items-start gap-4 eco-card p-4">
                    <div className="w-10 h-10 gradient-green rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-green">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-medium text-sm hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium text-sm">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection animation="slideInLeft" delay={300}>
                <div className="gradient-green rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2 font-merriweather">
                    {t("officeHoursTitle")}
                  </h3>
                  <div className="space-y-1 text-white/85 text-sm">
                    <div className="flex justify-between">
                      <span>{t("mondayFriday")}</span>
                      <span className="font-medium">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("saturday")}</span>
                      <span className="font-medium">9:00 AM – 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("sunday")}</span>
                      <span className="font-medium">{t("closed")}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection animation="slideUp">
                <div className="eco-card p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-zoomIn">
                      <div className="w-20 h-20 gradient-green rounded-full flex items-center justify-center mb-5 shadow-green">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 font-merriweather">
                        {t("messageSentTitle")}
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-sm">
                        {t("messageSentSubtitle")}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="btn-outline-green"
                      >
                        {t("sendAnotherMessage")}
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-foreground mb-6 font-merriweather">
                        {t("sendUsMessage")}
                      </h2>

                      {submitError && (
                        <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-5 animate-fadeIn">
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-destructive text-sm">
                            {submitError}
                          </p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            {t("fullName")}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={t("enterFullName")}
                            disabled={isSubmitting}
                            className={`search-input ${errors.name ? "border-destructive focus:border-destructive" : ""}`}
                          />
                          {errors.name && (
                            <p className="text-destructive text-xs mt-1 animate-fadeIn">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            {t("emailAddress")}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder={t("enterEmail")}
                            disabled={isSubmitting}
                            className={`search-input ${errors.email ? "border-destructive focus:border-destructive" : ""}`}
                          />
                          {errors.email && (
                            <p className="text-destructive text-xs mt-1 animate-fadeIn">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="contact-message"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            {t("message")}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder={t("tellUsHowHelp")}
                            rows={5}
                            disabled={isSubmitting}
                            className={`search-input resize-none ${errors.message ? "border-destructive focus:border-destructive" : ""}`}
                          />
                          {errors.message && (
                            <p className="text-destructive text-xs mt-1 animate-fadeIn">
                              {errors.message}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base gradient-green text-white shadow-green hover:shadow-card-hover hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {t("sending")}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              {t("send")}
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Banner */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="zoomIn">
            <div className="text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h2 className="text-3xl font-bold text-foreground mb-4 font-merriweather">
                {t("motivationalQuote")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("motivationalText")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">{t("faqTitle")}</h2>
          </AnimatedSection>
          <div className="space-y-4 mt-8">
            {(
              [
                { qKey: "faqQ1", aKey: "faqA1" },
                { qKey: "faqQ2", aKey: "faqA2" },
                { qKey: "faqQ3", aKey: "faqA3" },
                { qKey: "faqQ4", aKey: "faqA4" },
              ] as const
            ).map(({ qKey, aKey }, i) => (
              <AnimatedSection key={qKey} animation="slideUp" delay={i * 80}>
                <div className="eco-card p-5">
                  <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                    <span className="text-primary font-bold flex-shrink-0">
                      Q.
                    </span>
                    {t(qKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-5">
                    {t(aKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
