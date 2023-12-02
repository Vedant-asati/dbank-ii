import D "mo:base/Debug";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
// import Text "mo:base/Text";
actor {
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };
  // stable
  stable var hih : Float = 214_214;
  stable var startS : Float = 1700836000;
  func greet(_name : Text) {
    D.print(debug_show (hih));
    D.print(debug_show (_name));
    // return "Hello, " # name # "!";
  };
  public func inc(val : Float) {
    hih := hih+val;
    D.print(debug_show (hih));
  };
  public func decr(val : Float) : async Float {
    if (val <= hih) {
      hih := hih-val;
      D.print(debug_show (hih));
    } else D.print("JSR! Thats not gonna work!");
    return hih;
  };
  public query func getBalance() : async Float {
    // D.print(debug_show (hih));
    return hih;
  };
  // let timeNow = Time.now();
  public func getTime() : async Int {
    let timeNow = Time.now();
    D.print(debug_show (timeNow));
    return timeNow;
  };
  public func compound() : async Float {
    let timeNow = Float.fromInt(Time.now());
    D.print(debug_show ("before : ", hih));
    let elapsedS : Float = (timeNow / 1000000000) -startS;
    D.print(debug_show ("startS : ", startS));
    D.print(debug_show ("nowS : ", (timeNow / 1000000000)));
    D.print(debug_show ("elapsedS : ", elapsedS));
    hih := hih * (1.001 ** elapsedS);
    D.print(debug_show ("after : ", hih));
    startS := timeNow / 1000000000;
    return hih;
  };
};
