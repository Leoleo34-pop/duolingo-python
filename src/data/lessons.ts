import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'variables',
    title: 'Variables',
    description: 'Apprends à stocker des données dans des variables',
    icon: '📦',
    color: 'from-blue-500 to-cyan-400',
    exercises: [
      {
        id: 'v1',
        type: 'qcm',
        question: 'Quelle est la syntaxe correcte pour créer une variable en Python ?',
        options: ['x = 5', 'var x = 5', 'int x = 5', 'let x = 5'],
        correctAnswer: 0,
        explanation: 'En Python, on crée une variable simplement avec le signe = : x = 5',
        xp: 10
      },
      {
        id: 'v2',
        type: 'truefalse',
        question: 'En Python, une variable doit être déclarée avec son type avant utilisation.',
        correctAnswer: 1, // false
        explanation: 'Faux ! Python est un langage à typage dynamique. Pas besoin de déclarer le type.',
        xp: 10
      },
      {
        id: 'v3',
        type: 'qcm',
        question: 'Quel type de données contient la variable : nom = "Alice" ?',
        options: ['int', 'float', 'str', 'bool'],
        correctAnswer: 2,
        explanation: 'Les guillemets indiquent une chaîne de caractères (str).',
        xp: 10
      },
      {
        id: 'v4',
        type: 'reorder',
        question: 'Réarrange les lignes pour créer un programme qui stocke ton âge et l\'affiche :',
        options: ['age = 25', 'print(age)', '# Mon programme'],
        correctAnswer: ['# Mon programme', 'age = 25', 'print(age)'],
        explanation: 'On peut commenter, assigner une variable, puis l\'afficher avec print().',
        xp: 15
      },
      {
        id: 'v5',
        type: 'code',
        question: 'Crée une variable appelée "prenom" contenant la valeur "Python" et affiche-la :',
        codeTemplate: '# Écris ton code ici\n',
        correctAnswer: 'prenom = "Python"\nprint(prenom)',
        explanation: 'prenom = "Python"\nprint(prenom)',
        xp: 20
      }
    ]
  },
  {
    id: 'conditions',
    title: 'Conditions',
    description: 'Maîtrise les instructions if, elif et else',
    icon: '🔀',
    color: 'from-purple-500 to-pink-400',
    exercises: [
      {
        id: 'c1',
        type: 'qcm',
        question: 'Quel mot-clé utilise-t-on pour une condition en Python ?',
        options: ['switch', 'if', 'when', 'case'],
        correctAnswer: 1,
        explanation: 'Le mot-clé "if" permet de tester une condition en Python.',
        xp: 10
      },
      {
        id: 'c2',
        type: 'truefalse',
        question: 'En Python, l\'indentation est optionnelle dans un bloc if.',
        correctAnswer: 1,
        explanation: 'Faux ! L\'indentation est OBLIGATOIRE en Python, elle définit les blocs de code.',
        xp: 10
      },
      {
        id: 'c3',
        type: 'reorder',
        question: 'Réarrange pour créer une condition qui affiche "Adulte" si age >= 18 :',
        options: ['    print("Adulte")', 'if age >= 18:', 'else:', '    print("Mineur")'],
        correctAnswer: ['if age >= 18:', '    print("Adulte")', 'else:', '    print("Mineur")'],
        explanation: 'La structure if/else avec indentation correcte permet de gérer les deux cas.',
        xp: 15
      },
      {
        id: 'c4',
        type: 'qcm',
        question: 'Quel opérateur compare l\'égalité de deux valeurs en Python ?',
        options: ['=', '==', '===', 'eq'],
        correctAnswer: 1,
        explanation: '== compare les valeurs. = est pour l\'assignation. Python n\'utilise pas ===.',
        xp: 10
      },
      {
        id: 'c5',
        type: 'code',
        question: 'Écris une condition qui affiche "Positif" si x > 0, sinon "Négatif ou nul" :',
        codeTemplate: 'x = 5\n# Écris ta condition ici\n',
        correctAnswer: 'if x > 0:\n    print("Positif")\nelse:\n    print("Négatif ou nul")',
        explanation: 'if x > 0:\n    print("Positif")\nelse:\n    print("Négatif ou nul")',
        xp: 20
      }
    ]
  },
  {
    id: 'boucles',
    title: 'Boucles',
    description: 'Répète des actions avec for et while',
    icon: '🔄',
    color: 'from-green-500 to-emerald-400',
    exercises: [
      {
        id: 'b1',
        type: 'qcm',
        question: 'Quelle boucle est utilisée pour itérer sur une séquence en Python ?',
        options: ['while', 'for', 'do...while', 'repeat'],
        correctAnswer: 1,
        explanation: 'La boucle "for" permet d\'itérer sur une séquence (liste, range, string...).',
        xp: 10
      },
      {
        id: 'b2',
        type: 'truefalse',
        question: 'range(5) génère les nombres de 0 à 5 inclus.',
        correctAnswer: 1,
        explanation: 'Faux ! range(5) génère 0, 1, 2, 3, 4. Le dernier nombre est EXCLU.',
        xp: 10
      },
      {
        id: 'b3',
        type: 'reorder',
        question: 'Réarrange pour afficher les nombres de 1 à 3 :',
        options: ['for i in range(1, 4):', '    print(i)'],
        correctAnswer: ['for i in range(1, 4):', '    print(i)'],
        explanation: 'range(1, 4) donne 1, 2, 3. La boucle for itère et affiche chaque valeur.',
        xp: 15
      },
      {
        id: 'b4',
        type: 'qcm',
        question: 'Combien de fois s\'exécute cette boucle ?\nwhile x > 0:\n    x -= 1\n(x commence à 3)',
        options: ['2 fois', '3 fois', '4 fois', 'Infini'],
        correctAnswer: 1,
        explanation: 'x = 3 → 2 → 1 → 0. La boucle s\'arrête quand x = 0. Donc 3 itérations.',
        xp: 10
      },
      {
        id: 'b5',
        type: 'code',
        question: 'Écris une boucle for qui affiche les nombres de 0 à 4 :',
        codeTemplate: '# Écris ta boucle ici\n',
        correctAnswer: 'for i in range(5):\n    print(i)',
        explanation: 'for i in range(5):\n    print(i)',
        xp: 20
      }
    ]
  },
  {
    id: 'fonctions',
    title: 'Fonctions',
    description: 'Crée tes propres fonctions réutilisables',
    icon: '⚡',
    color: 'from-orange-500 to-yellow-400',
    exercises: [
      {
        id: 'f1',
        type: 'qcm',
        question: 'Quel mot-clé définit une fonction en Python ?',
        options: ['function', 'func', 'def', 'fn'],
        correctAnswer: 2,
        explanation: 'Le mot-clé "def" est utilisé pour définir une fonction en Python.',
        xp: 10
      },
      {
        id: 'f2',
        type: 'truefalse',
        question: 'Une fonction Python peut retourner plusieurs valeurs.',
        correctAnswer: 0,
        explanation: 'Vrai ! On peut retourner un tuple : return a, b, c',
        xp: 10
      },
      {
        id: 'f3',
        type: 'reorder',
        question: 'Réarrange pour créer une fonction qui additionne deux nombres :',
        options: ['    return a + b', 'def addition(a, b):', 'resultat = addition(3, 5)'],
        correctAnswer: ['def addition(a, b):', '    return a + b', 'resultat = addition(3, 5)'],
        explanation: 'On définit la fonction avec def, on retourne le résultat, puis on l\'appelle.',
        xp: 15
      },
      {
        id: 'f4',
        type: 'qcm',
        question: 'Que retourne cette fonction ?\ndef salut():\n    return "Bonjour"\n    return "Hello"',
        options: ['"Bonjour"', '"Hello"', '"BonjourHello"', 'Erreur'],
        correctAnswer: 0,
        explanation: 'Le premier return termine la fonction. Le second return n\'est jamais atteint.',
        xp: 10
      },
      {
        id: 'f5',
        type: 'code',
        question: 'Crée une fonction "carre" qui prend un nombre et retourne son carré :',
        codeTemplate: '# Définis ta fonction ici\n',
        correctAnswer: 'def carre(n):\n    return n * n',
        explanation: 'def carre(n):\n    return n * n',
        xp: 20
      }
    ]
  },
  {
    id: 'listes',
    title: 'Listes',
    description: 'Manipule des collections de données',
    icon: '📋',
    color: 'from-rose-500 to-red-400',
    exercises: [
      {
        id: 'l1',
        type: 'qcm',
        question: 'Comment crée-t-on une liste vide en Python ?',
        options: ['list = {}', 'list = []', 'list = ()', 'list = ""'],
        correctAnswer: 1,
        explanation: 'Les crochets [] créent une liste. {} crée un dictionnaire, () un tuple.',
        xp: 10
      },
      {
        id: 'l2',
        type: 'truefalse',
        question: 'Les listes en Python sont modifiables après leur création.',
        correctAnswer: 0,
        explanation: 'Vrai ! Les listes sont mutables. On peut ajouter, supprimer ou modifier des éléments.',
        xp: 10
      },
      {
        id: 'l3',
        type: 'qcm',
        question: 'Quelle méthode ajoute un élément à la fin d\'une liste ?',
        options: ['add()', 'push()', 'append()', 'insert()'],
        correctAnswer: 2,
        explanation: 'append() ajoute un élément à la fin. insert() permet de spécifier la position.',
        xp: 10
      },
      {
        id: 'l4',
        type: 'reorder',
        question: 'Réarrange pour créer une liste et afficher le premier élément :',
        options: ['fruits = ["pomme", "banane", "orange"]', 'print(fruits[0])'],
        correctAnswer: ['fruits = ["pomme", "banane", "orange"]', 'print(fruits[0])'],
        explanation: 'On crée la liste puis on accède au premier élément avec l\'index [0].',
        xp: 15
      },
      {
        id: 'l5',
        type: 'code',
        question: 'Crée une liste "nombres" avec [1, 2, 3] et ajoute 4 avec append :',
        codeTemplate: '# Crée ta liste ici\n',
        correctAnswer: 'nombres = [1, 2, 3]\nnombres.append(4)',
        explanation: 'nombres = [1, 2, 3]\nnombres.append(4)',
        xp: 20
      }
    ]
  },
  {
    id: 'dictionnaires',
    title: 'Dictionnaires',
    description: 'Stocke des données avec des clés-valeurs',
    icon: '📖',
    color: 'from-indigo-500 to-blue-400',
    exercises: [
      {
        id: 'd1',
        type: 'qcm',
        question: 'Comment crée-t-on un dictionnaire en Python ?',
        options: ['{}', '[]', '()', 'dict[]'],
        correctAnswer: 0,
        explanation: 'Les accolades {} créent un dictionnaire. On peut aussi utiliser dict().',
        xp: 10
      },
      {
        id: 'd2',
        type: 'truefalse',
        question: 'Les clés d\'un dictionnaire Python doivent être uniques.',
        correctAnswer: 0,
        explanation: 'Vrai ! Chaque clé doit être unique. Si on réassigne une clé, la nouvelle valeur remplace l\'ancienne.',
        xp: 10
      },
      {
        id: 'd3',
        type: 'reorder',
        question: 'Réarrange pour créer un dictionnaire et accéder à une valeur :',
        options: ['personne = {"nom": "Alice", "age": 30}', 'print(personne["nom"])'],
        correctAnswer: ['personne = {"nom": "Alice", "age": 30}', 'print(personne["nom"])'],
        explanation: 'On crée le dict avec des paires clé:valeur, puis on accède avec dict["clé"].',
        xp: 15
      },
      {
        id: 'd4',
        type: 'qcm',
        question: 'Quelle méthode retourne toutes les clés d\'un dictionnaire ?',
        options: ['.values()', '.keys()', '.items()', '.all()'],
        correctAnswer: 1,
        explanation: '.keys() retourne toutes les clés. .values() les valeurs. .items() les paires.',
        xp: 10
      },
      {
        id: 'd5',
        type: 'code',
        question: 'Crée un dictionnaire "chat" avec les clés "nom" et "age" :',
        codeTemplate: '# Crée ton dictionnaire ici\n',
        correctAnswer: 'chat = {"nom": "Minou", "age": 3}',
        explanation: 'chat = {"nom": "Minou", "age": 3}',
        xp: 20
      }
    ]
  }
];
