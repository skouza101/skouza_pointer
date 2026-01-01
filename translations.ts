export type Language = "en" | "fr";

export const translations = {
  en: {
    nav: {
      definition: "Definition",
      analogy: "Analogy",
      simulator: "Simulator",
      pitfalls: "Pitfalls",
      tutor: "AI Tutor",
    },
    hero: {
      title: "Master C Pointers",
      subtitle:
        "Demystifying the most feared concept in C programming through interactive visualization and AI-powered tutoring.",
      trySimulator: "Try Simulator",
      startLearning: "Start Learning",
    },
    definition: {
      title: "What is a Pointer?",
      description:
        "In C programming, a **pointer** is a variable that stores the *memory address* of another variable.",
      regularVariable: "Regular Variable",
      pointerVariable: "Pointer Variable",
      storesValue: "Stores the value",
      directly: "directly.",
      storesAddress: "Stores the",
      address: "address",
      ofVariable: "of the variable 'score'.",
      keyOperators: "Key Operators",
      addressOf: "Address-of Operator:",
      addressOfDesc: "Returns the memory address of a variable.",
      dereference: "Dereference Operator:",
      dereferenceDesc:
        "Accesses the value stored at the address held by the pointer.",
      askAI: "Explain like I am 5 (AI Generated)",
      consultingAI: "Consulting Professor AI...",
      professorSays: "Professor AI says:",
    },
    analogy: {
      title: "The Mailbox Analogy",
      intro: "Think of computer memory as a giant street with infinitely many houses.",
      houseTitle: "The House (Variable)",
      houseDesc:
        "This represents a variable `int x = 10;`. It exists in the physical world and contains contents (the value 10).",
      addressTitle: "The Address Plate",
      addressDesc:
        "Every house has a unique location. In C, we get this using `&x`. It's fixed and tells us where the variable lives.",
      noteTitle: "The Note (Pointer)",
      noteDesc:
        "A pointer `int *ptr` is just a piece of paper (another variable) that holds the *address* written on it. It doesn't hold the house, just directions to it.",
    },
    simulator: {
      fileName: "main.c",
      runCode: "Run Code",
      editCode: "Edit Code",
      nextStep: "Next Step",
      terminalOutput: "Terminal Output:",
      step: "Step",
      ramTitle: "RAM (Stack Memory)",
      integer: "Integer",
      pointer: "Pointer",
      memoryEmpty: "Memory Empty",
      runToAllocate: "Run code to allocate memory",
      endOfProgram: "-- End of Program --",
      placeholder: "Type your C code here...",
    },
    pitfalls: {
      title: "Common Pitfalls",
      uninitializedTitle: "Uninitialized Pointers",
      uninitializedDesc:
        "Declaring a pointer without assigning it a valid address causes it to point to garbage memory.",
      danglingTitle: "Dangling Pointers",
      danglingDesc:
        "A pointer that references memory that has been freed or is out of scope.",
      danglingFix: "Always ensure the variable outlives the pointer.",
      memoryLeakTitle: "Memory Leaks",
      memoryLeakDesc:
        "Allocating memory with malloc() but forgetting to free() it.",
    },
    tutor: {
      title: "AI Tutor Chat",
      greeting:
        "Hello! I'm your C Programming Tutor. Ask me anything about pointers, arrays, or memory management!",
      placeholder: "Ask about pointers...",
      send: "Send",
    },
    footer: {
      copyright: "© 2026 SKOUZA PointerMaster C. Built by SKOUZA.",
    },
  },
  fr: {
    nav: {
      definition: "Définition",
      analogy: "Analogie",
      simulator: "Simulateur",
      pitfalls: "Pièges",
      tutor: "Tuteur IA",
    },
    hero: {
      title: "Maîtrisez les Pointeurs C",
      subtitle:
        "Démystifier le concept le plus redouté en programmation C grâce à la visualisation interactive et au tutorat IA.",
      trySimulator: "Essayer le Simulateur",
      startLearning: "Commencer à Apprendre",
    },
    definition: {
      title: "Qu'est-ce qu'un Pointeur ?",
      description:
        "En programmation C, un **pointeur** est une variable qui stocke l'*adresse mémoire* d'une autre variable.",
      regularVariable: "Variable Classique",
      pointerVariable: "Variable Pointeur",
      storesValue: "Stocke la valeur",
      directly: "directement.",
      storesAddress: "Stocke l'",
      address: "adresse",
      ofVariable: "de la variable 'score'.",
      keyOperators: "Opérateurs Clés",
      addressOf: "Opérateur d'Adresse :",
      addressOfDesc: "Retourne l'adresse mémoire d'une variable.",
      dereference: "Opérateur de Déréférencement :",
      dereferenceDesc:
        "Accède à la valeur stockée à l'adresse contenue dans le pointeur.",
      askAI: "Expliquez-moi comme si j'avais 5 ans (Généré par IA)",
      consultingAI: "Consultation du Professeur IA...",
      professorSays: "Le Professeur IA dit :",
    },
    analogy: {
      title: "L'Analogie de la Boîte aux Lettres",
      intro:
        "Imaginez la mémoire de l'ordinateur comme une immense rue avec une infinité de maisons.",
      houseTitle: "La Maison (Variable)",
      houseDesc:
        "Cela représente une variable `int x = 10;`. Elle existe dans le monde physique et contient un contenu (la valeur 10).",
      addressTitle: "La Plaque d'Adresse",
      addressDesc:
        "Chaque maison a un emplacement unique. En C, on l'obtient avec `&x`. C'est fixe et ça nous dit où vit la variable.",
      noteTitle: "Le Papier (Pointeur)",
      noteDesc:
        "Un pointeur `int *ptr` est simplement un bout de papier (une autre variable) qui contient l'*adresse* écrite dessus. Il ne contient pas la maison, juste les directions pour y aller.",
    },
    simulator: {
      fileName: "main.c",
      runCode: "Exécuter",
      editCode: "Modifier le Code",
      nextStep: "Étape Suivante",
      terminalOutput: "Sortie Terminal :",
      step: "Étape",
      ramTitle: "RAM (Mémoire de Pile)",
      integer: "Entier",
      pointer: "Pointeur",
      memoryEmpty: "Mémoire Vide",
      runToAllocate: "Exécutez le code pour allouer de la mémoire",
      endOfProgram: "-- Fin du Programme --",
      placeholder: "Tapez votre code C ici...",
    },
    pitfalls: {
      title: "Pièges Courants",
      uninitializedTitle: "Pointeurs Non Initialisés",
      uninitializedDesc:
        "Déclarer un pointeur sans lui assigner une adresse valide le fait pointer vers une mémoire aléatoire.",
      danglingTitle: "Pointeurs Pendants",
      danglingDesc:
        "Un pointeur qui référence une mémoire qui a été libérée ou qui est hors de portée.",
      danglingFix: "Assurez-vous toujours que la variable survit au pointeur.",
      memoryLeakTitle: "Fuites de Mémoire",
      memoryLeakDesc:
        "Allouer de la mémoire avec malloc() mais oublier de la libérer avec free().",
    },
    tutor: {
      title: "Chat Tuteur IA",
      greeting:
        "Bonjour ! Je suis votre tuteur de programmation C. Posez-moi n'importe quelle question sur les pointeurs, les tableaux ou la gestion de la mémoire !",
      placeholder: "Posez une question sur les pointeurs...",
      send: "Envoyer",
    },
    footer: {
      copyright: "© 2026 SKOUZA PointerMaster C. Créé par SKOUZA.",
    },
  },
};

export const getTranslation = (lang: Language) => translations[lang];
