"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api/authService";
import styles from "../../components/ui/styles-modules/LoginForm.module.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "paguemenos",
    password: "123456",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.getLoginInfo(
        formData.username,
        formData.password
      );

      if (response.isAuthenticated) {
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/order");
      } else {
        setError("Acesso negado");
      }
    } catch (err) {
      setError("Erro ao tentar autenticar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}></h1>
          <h2 className={styles.title}>Faça seu Login</h2>
          <p className={styles.subtitle}>Entre com suas credenciais</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Usuário
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite seu usuário"
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite sua senha"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading || !formData.username || !formData.password}
        >
          {isLoading ? (
            <>
              <div className={styles.spinner}></div>
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>

        <div className={styles.footerLinks}>
          usuario: paguemenos - senha: 123456
        </div>
      </form>
    </div>
  );
}
