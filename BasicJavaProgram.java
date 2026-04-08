public class BasicJavaProgram {
    
    public static void main(String[] args) {
        // Simple Hello World program
        System.out.println("Hello, World!");
        
        // Basic variable examples
        String name = "User";
        int age = 25;
        double score = 95.5;
        
        // Print variables
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Score: " + score);
        
        // Simple for loop
        System.out.println("\nCounting from 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
        
        // Simple if-else statement
        System.out.println("\nChecking age:");
        if (age >= 18) {
            System.out.println("You are an adult.");
        } else {
            System.out.println("You are a minor.");
        }
    }
}
