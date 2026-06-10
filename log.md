Date: 4th June '26
1. Converted the crop recommendation from fake logic to a real ML model
2. Built a Flask backend
3. Trained:

crop_model.pkl
and later:
crop_model_v2.pkl

4. Improved accuracy:

63.82% → 68.51%

5. Connected frontend → Flask → ML model
6. Added real confidence scores
7. Added crop metadata mapping
8. Explored dataset quality and class imbalance
9. Created a SQLite prototype (which we're no longer planning to use)

Date: 10 and 11th June, '26
10. Added Confidence Level
11. Added extra attributes for recommendation
12. Added location search dropdown/autofill
13. Region & District locked after auto-fill
14. Dark mode updates
15. Live Location correction and update
16. PDF share button update
17. Added XGBoost and removed RandomClassifier
18. Polished the trained dataset
19. Original Random Forest        → 68.51%
    Tuned Random Forest           → 69.00%
    Balanced Random Forest        → 67.06%
    XGBoost + Label Encoding      → 73.96%
    XGBoost + Ratio Features      → 74.89%
20. Prediction endpoint working
21. Top 5 recommendations generated internally