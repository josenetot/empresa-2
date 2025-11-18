// 1 - carrega a primeira frase

document.addEventListener("DOMContentLoaded", () => {
    console.log("Home carregada com sucesso!");
});



// 2 - Controla o clique nos pontos e adiciona animações suaves:

const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        // remove o ativo anterior
        dots.forEach(d => d.classList.remove('active'));
        // ativa o clicado
        dot.classList.add('active');

        const page = dot.getAttribute('data-page');
        console.log(`Navegando para: ${page}`);

        // aqui futuramente você pode fazer o scroll ou troca de seção
    });
});


// 3 - Ajuste na navegação 

// --- ATIVAR PONTO DE NAVEGAÇÃO CONFORME A PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    // Pega o nome do arquivo atual (ex: "index.html", "sobre.html")
    const currentPage = window.location.pathname.split("/").pop();

    // Seleciona todos os pontos do menu
    const navLinks = document.querySelectorAll(".nav-dots .dot-box a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        // Se o link corresponde à página atual, ativa ele
        if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});


// 4 - TRANSIÇÃO SUAVE ENTRE PÁGINAS 

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    body.classList.add("fade-transition");

    // Quando clicar em um link interno (.dot-box a)
    const links = document.querySelectorAll(".dot-box a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // impede mudança imediata
            const href = link.getAttribute("href");

            // adiciona animação de saída
            body.classList.add("fade-out");

            // após 600ms (tempo da transição), troca de página
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });
});

// --- FOGUETE COM DIREÇÃO E RASTRO ---
document.addEventListener("DOMContentLoaded", () => {
    const rocket = document.querySelector(".rocket-transition");
    const flame = document.querySelector(".rocket-flame");
    const links = document.querySelectorAll(".dot-box a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");

            // identifica direção do clique
            const currentIndex = [...links].findIndex(l => window.location.href.includes(l.getAttribute("href")));
            const targetIndex = [...links].indexOf(link);
            const goingRight = targetIndex > currentIndex;

            // limpa animações anteriores
            rocket.classList.remove("rocket-fly-right", "rocket-fly-left");

            // define ponto inicial
            rocket.style.left = goingRight ? "-150px" : "110%";
            rocket.style.transform = goingRight ? "translateY(-50%) rotate(0deg)" : "translateY(-50%) rotate(180deg)";
            flame.style.opacity = "1";

            // dispara direção certa
            requestAnimationFrame(() => {
                rocket.classList.add(goingRight ? "rocket-fly-right" : "rocket-fly-left");
            });

            setTimeout(() => {
                window.location.href = href;
            }, 2300);
        });
    });
});\
r\ n\ r\ n // --- SERVICE BUILDER FLOW ---

document.addEventListener("DOMContentLoaded", () => {
    const builderForm = document.getElementById("serviceBuilderForm");
    if (!builderForm) {
        return;
    }

    const steps = Array.from(builderForm.querySelectorAll(".builder-step"));
    const progressBar = builderForm.querySelector(".progress-bar");
    const progressStepLabel = builderForm.querySelector("[data-progress-step]");
    const summaryList = builderForm.querySelector("[data-summary-list]");
    const budgetTotal = builderForm.querySelector("[data-budget-total]");
    const budgetNote = builderForm.querySelector("[data-budget-note]");
    const inputs = builderForm.querySelectorAll(".option-card input");
    const prevButtons = builderForm.querySelectorAll(".builder-prev");
    const nextButtons = builderForm.querySelectorAll(".builder-next");
    const resetButton = builderForm.querySelector(".builder-reset");
    const builderCard = builderForm.closest(".builder-card");

    const focusOptions = {
        launchpad: {
            title: "Launchpad Digital",
            base: 3500,
            summary: "Onboarding enxuto para validar proposta de valor e criar autoridade."
        },
        commerce: {
            title: "Commerce & Product",
            base: 7500,
            summary: "Estrutura de venda com cat\u00e1logo, checkout seguro e integra\u00e7\u00f5es essenciais."
        },
        platform: {
            title: "Plataforma Sob Medida",
            base: 12000,
            summary: "Produto digital customizado com fluxos complexos, dashboards e integra\u00e7\u00f5es estrat\u00e9gicas."
        }
    };

    const featureOptions = {
        identity: {
            label: "Identidade Viva",
            price: 1200
        },
        content: {
            label: "Conte\u00fado & Copy",
            price: 900
        },
        integrations: {
            label: "Integra\u00e7\u00f5es & APIs",
            price: 2500
        },
        automation: {
            label: "Automa\u00e7\u00f5es",
            price: 2000
        },
        data: {
            label: "Dados & IA",
            price: 3000
        }
    };

    const timelineOptions = {
        fast: {
            label: "Trajeto Express",
            multiplier: 1.25,
            note: "Squad dedicado para colocar em produ\u00e7\u00e3o em at\u00e9 4 semanas."
        },
        balanced: {
            label: "Plano Orbitado",
            multiplier: 1,
            note: "Entrega robusta em 5 a 8 semanas com valida\u00e7\u00f5es iterativas."
        },
        steady: {
            label: "Evolu\u00e7\u00e3o Cont\u00ednua",
            multiplier: 0.85,
            note: "Roadmap evolutivo e otimiza\u00e7\u00f5es constantes por ciclos."
        }
    };

    const state = {
        focus: null,
        features: new Set(),
        timeline: null,
        support: false
    };

    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });

    let currentStep = 0;

    const scrollToCard = () => {
        if (builderCard) {
            builderCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const updateOptionCardVisual = (input) => {
        const groupInputs = builderForm.querySelectorAll(`input[name="${input.name}"]`);
        groupInputs.forEach((item) => {
            const card = item.closest(".option-card");
            if (card) {
                const shouldSelect = item.checked;
                card.classList.toggle("is-selected", shouldSelect);
            }
        });
    };

    const updateControls = () => {
        const current = steps[currentStep];
        const nextBtn = current.querySelector(".builder-next");
        if (nextBtn) {
            if (currentStep === 0) {
                nextBtn.disabled = !state.focus;
            } else if (currentStep === 2) {
                nextBtn.disabled = !state.timeline;
            } else {
                nextBtn.disabled = false;
            }
        }
        if (progressStepLabel) {
            progressStepLabel.textContent = currentStep + 1;
        }
    };

    const updateProgress = () => {
        if (!progressBar) {
            return;
        }
        const ratio = currentStep / (steps.length - 1);
        progressBar.style.width = `${Math.max(ratio, 0) * 100}%`;
    };

    const formatCurrency = (value) => currencyFormatter.format(Math.round(value / 100) * 100);

    const buildSummary = () => {
        const focus = state.focus ? focusOptions[state.focus] : null;
        const timeline = state.timeline ? timelineOptions[state.timeline] : null;
        if (!focus || !timeline || !summaryList || !budgetTotal || !currencyFormatter) {
            return;
        }

        const features = Array.from(state.features);
        const featureLabels = features.map((key) => featureOptions[key] ? .label).filter(Boolean);
        const featureTotal = features.reduce((sum, key) => sum + (featureOptions[key] ? .price || 0), 0);
        const baseTotal = focus.base + featureTotal;
        const estimated = baseTotal * timeline.multiplier;
        const lower = Math.max(3000, estimated * 0.9);
        const upper = estimated * 1.15;

        const summaryItems = [];
        summaryItems.push(`<li><strong>${focus.title}</strong>: ${focus.summary}</li>`);
        if (featureLabels.length) {
            summaryItems.push(`<li>Camadas escolhidas: ${featureLabels.join(", ")}</li>`);
        } else {
            summaryItems.push(`<li>Camadas essenciais do pacote ${focus.title}.</li>`);
        }
        summaryItems.push(`<li>Ritmo de entrega: ${timeline.label}</li>`);
        if (state.support) {
            summaryItems.push("<li>Suporte ativo: Operamos ao lado do seu time com ciclos mensais.</li>");
        } else {
            summaryItems.push("<li>Suporte sob demanda conforme necessidade.</li>");
        }

        summaryList.innerHTML = summaryItems.join("");
        budgetTotal.textContent = `${formatCurrency(lower)} a ${formatCurrency(upper)}`;
        const supportNote = state.support ? " + Suporte cont\u00ednuo sugerido a partir de R$1.100/m\u00eas." : "";
        if (budgetNote) {
            budgetNote.textContent = `${timeline.note}${supportNote}`;
        }
    };

    const goToStep = (index) => {
        if (index < 0 || index >= steps.length) {
            return;
        }
        steps[currentStep].classList.remove("active");
        currentStep = index;
        steps[currentStep].classList.add("active");
        updateProgress();
        updateControls();
        scrollToCard();
        if (currentStep === steps.length - 1) {
            buildSummary();
        }
    };

    inputs.forEach((input) => {
        updateOptionCardVisual(input);
        input.addEventListener("change", () => {
            if (input.name === "projectFocus") {
                if (input.checked) {
                    state.focus = input.value;
                }
            } else if (input.name === "feature") {
                if (input.checked) {
                    state.features.add(input.value);
                } else {
                    state.features.delete(input.value);
                }
            } else if (input.name === "timeline") {
                if (input.checked) {
                    state.timeline = input.value;
                }
            } else if (input.name === "support") {
                state.support = input.checked;
            }
            updateOptionCardVisual(input);
            updateControls();
        });
    });

    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.disabled) {
                return;
            }
            goToStep(currentStep + 1);
        });
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            goToStep(currentStep - 1);
        });
    });

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            steps[currentStep].classList.remove("active");
            currentStep = 0;
            steps[currentStep].classList.add("active");
            state.focus = null;
            state.features.clear();
            state.timeline = null;
            state.support = false;
            inputs.forEach((input) => {
                input.checked = false;
                updateOptionCardVisual(input);
            });
            if (summaryList) {
                summaryList.innerHTML = "";
            }
            if (budgetTotal) {
                budgetTotal.textContent = "R$ --";
            }
            if (budgetNote) {
                budgetNote.textContent = "Escolha as op\u00e7\u00f5es para gerar uma estimativa.";
            }
            updateProgress();
            updateControls();
            scrollToCard();
        });
    }

    updateProgress();
    updateControls();
    if (budgetNote) {
        budgetNote.textContent = "Escolha as op\u00e7\u00f5es para gerar uma estimativa.";
    }
});