export default {
    c: `#include <stdio.h>
int main(void){
    int i, n;
    char buf[1000];
    char token1[100], token2[100];

    fgets(buf, sizeof(buf), stdin);
    sscanf(buf, "%d\n", &n);
    for (i=0; i<n; i++) {
    fgets(buf, sizeof(buf), stdin);
    sscanf(buf, "%s %s\n", token1, token2);
    printf("hello = %s , world = %s\n" ,token1 ,token2);
    }
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;
int main(void){
    int n;
    string token1, token2;

    cin >> n;
    for(int i = 0; i < n; i++) {
    cin >> token1 >> token2;
    cout << "hello = " << token1 << " , world = " << token2 << endl;
    }
    return 0;
}`,
    csharp: `class Hello {
    static void Main(string[] args) {
        var line1 = System.Console.ReadLine().Trim();
        var N = int.Parse(line1);
        for (var i = 0; i < N; i++) {
        string[] stArrayData = System.Console.ReadLine().Trim().Split(' ');
        System.Console.WriteLine("hello = {0} , world = {1}", stArrayData[0], stArrayData[1]);
        }
    }
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args ) throws Exception {
    Scanner sc = new Scanner(System.in);
    int N = sc.nextInt();
    for (int i = 0; i < N; i++) {
        String token1 = sc.next();
        String token2 = sc.next();
        System.out.println("hello = " + token1 + " , world = " + token2);
    }
  }
}`,
    python: `input_line = int(raw_input())
for i in xrange(input_line):
  s = raw_input().rstrip().split(' ')
  print "hello = "+s[0]+" , world = "+s[1]`,
    python3: `input_line = int(input())
    for i in range(input_line):
      s = input().rstrip().split(' ')
      print("hello = "+s[0]+" , world = "+s[1])`,
    ruby: `input_line = gets.to_i
input_line.times do
  s = gets.chomp.split(" ")
  print "hello = #{ s[0] } , world = #{ s[1] }\n"
end`,
    perl: `my $input_line = <STDIN>;
for ($i = 0; $i < $input_line; $i++) {
  my $s = <STDIN>;
  chomp($s);
  @s = split(/ /,$s);
  print "hello = ".$s[0]." , world = ".$s[1]."\n";
}`,
    php: `<?php
$input_line = trim(fgets(STDIN));
for ($i = 0; $i < $input_line; $i++) {
    $s = trim(fgets(STDIN));
    $s = str_replace(array("\r\n","\r","\n"), '', $s);
    $s = explode(" ", $s);
    echo "hello = ".$s[0]." , world = ".$s[1]."\n";
}`,
    javascript: `process.stdin.resume();
process.stdin.setEncoding('utf8');

var lines = []
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on('line', (line) => {
  lines.push(line);
});

reader.on('close', () => {
  var N = lines[0];
  for(var i = 0; i < N; i++) {
    var line = lines[i+1].split(" ");
    console.log("hello = " + line[0] + ", world = " + line[1]);
  }
});`,
  scala: `import scala.io.StdIn._
object Main extends App {
  val n = readLine.toInt
  for (i <- 0 until n) {
    val Seq(a, b) = readLine.split(" ")
    println("hello = %s , world = %s ".format(a, b))
  }
}`
}