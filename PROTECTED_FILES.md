# 🛡️ PROTECTED FILES - HANDLE WITH EXTREME CARE

## ⚠️ **CRITICAL WARNING**
**These files contain specific business content that MUST be preserved. Do NOT replace or overwrite these files without explicit permission and careful review.**

---

## 🚨 **HIGH-RISK FILES (NEVER REPLACE ENTIRELY)**

### **1. index.html**
**Risk Level:** 🔴 **CRITICAL**
**Protected Content:**
- Hero title: "Bridging Science & Tech Trade"
- Hero subtitle: Business-specific description
- Statistics: 45%, 2025, 85%
- Navigation: Must include "Products" link
- About section: Company-specific content

**Safe Operations:**
- ✅ Adding new sections
- ✅ Improving styling
- ✅ Enhancing functionality
- ❌ Replacing entire file
- ❌ Changing business content

### **2. contact.html**
**Risk Level:** 🔴 **CRITICAL**
**Protected Content:**
- Contact information
- Business hours
- Company address
- Service descriptions
- Form structure

**Safe Operations:**
- ✅ Improving form validation
- ✅ Enhancing styling
- ✅ Adding new contact methods
- ❌ Replacing entire file
- ❌ Changing contact details unless requested

### **3. privacy-policy.html**
**Risk Level:** 🟡 **MODERATE**
**Protected Content:**
- Legal business information
- Company details
- Contact information for legal matters

**Safe Operations:**
- ✅ Improving formatting
- ✅ Enhancing readability
- ✅ Adding new sections
- ❌ Changing legal content without review

### **4. terms-of-service.html**
**Risk Level:** 🟡 **MODERATE**
**Protected Content:**
- Service descriptions
- Business terms
- Legal requirements
- Company information

**Safe Operations:**
- ✅ Improving formatting
- ✅ Enhancing readability
- ✅ Adding new sections
- ❌ Changing legal content without review

---

## 🟡 **MODERATE-RISK FILES**

### **5. assets/css/contact.css**
**Risk Level:** 🟡 **MODERATE**
**Protected Content:**
- Custom styling for business-specific elements
- Form styling
- Layout structure

**Safe Operations:**
- ✅ Adding new styles
- ✅ Improving existing styles
- ✅ Enhancing responsive design
- ❌ Replacing entire file without checking

### **6. assets/css/legal.css**
**Risk Level:** 🟡 **MODERATE**
**Protected Content:**
- Legal page styling
- Print styles
- Accessibility features

**Safe Operations:**
- ✅ Adding new styles
- ✅ Improving existing styles
- ✅ Enhancing responsive design
- ❌ Replacing entire file without checking

---

## 🟢 **LOW-RISK FILES (SAFE TO MODIFY)**

### **7. assets/css/main.css**
**Risk Level:** 🟢 **LOW**
**Safe Operations:**
- ✅ Any styling improvements
- ✅ Adding new styles
- ✅ Modifying existing styles

### **8. assets/css/responsive.css**
**Risk Level:** 🟢 **LOW**
**Safe Operations:**
- ✅ Any responsive improvements
- ✅ Adding new breakpoints
- ✅ Modifying existing responsive rules

### **9. assets/css/animations.css**
**Risk Level:** 🟢 **LOW**
**Safe Operations:**
- ✅ Any animation improvements
- ✅ Adding new animations
- ✅ Modifying existing animations

---

## 📋 **FILE MODIFICATION PROTOCOL**

### **Before Modifying ANY Protected File:**

1. **🔍 Read the current file content**
2. **📖 Check BUSINESS_CONTENT.md for protected content**
3. **📋 Use AI_SAFETY_CHECKLIST.md**
4. **✏️ Make targeted edits, not full replacements**
5. **🧪 Test changes on localhost**
6. **💾 Commit changes with descriptive messages**

### **Emergency Recovery:**
If you accidentally overwrite a protected file:
```bash
# Check git history
git log --oneline -10

# Restore from previous commit
git show HEAD~1:filename > filename.backup

# Compare with current version
diff filename filename.backup
```

---

## 🚫 **FORBIDDEN OPERATIONS**

### **Never Do These:**
1. ❌ Replace entire HTML files without checking content
2. ❌ Overwrite files with generic templates
3. ❌ Change business-specific content without permission
4. ❌ Modify statistics or key business numbers
5. ❌ Remove navigation items (especially "Products")
6. ❌ Change company taglines or descriptions
7. ❌ Replace contact information with placeholders

### **Always Do These:**
1. ✅ Read AI_INSTRUCTIONS.md first
2. ✅ Check BUSINESS_CONTENT.md for protected content
3. ✅ Use targeted search_replace operations
4. ✅ Preserve business-specific content
5. ✅ Test changes before committing
6. ✅ Use descriptive commit messages

---

## 🔄 **BACKUP STRATEGY**

### **Before Major Changes:**
1. Create backup branch: `git checkout -b backup-[date]`
2. Commit current state: `git add . && git commit -m "Backup before [change description]"`
3. Make changes on main branch
4. Test thoroughly before merging

### **Regular Backups:**
- Daily commits with descriptive messages
- Weekly backup branches
- Before any major feature additions

---

**Remember: When in doubt, ask for permission before modifying protected files. It's better to be cautious than to lose important business content.**
