' SpellChecker class: based on Peter Norvig’s 21-line spelling corrector using probability theory
Public Class SpellChecker
    Private Const LETTERS As String = "abcdefghijklmnopqrstuvwxyz"
    Private wordRank As New Dictionary(Of String, Double)
    Private stpw As New System.Diagnostics.Stopwatch()

    ' Constructor
    Public Sub New(vocabulary As Dictionary(Of String, Integer))
        Dim N As Integer = vocabulary.Values.Sum()

        ' Load word probability
        For Each kvp As KeyValuePair(Of String, Integer) In vocabulary
            wordRank.Item(kvp.Key) = CDbl(kvp.Value) / N
        Next

    End Sub

    ' Get word solution
    Public Function GetCorrection(word As String) As Hashtable
        Dim result As New Hashtable()

        ' Begin calculations
        stpw.Start()
        Dim options As List(Of String) = Candidates(word)
        Dim answer As String = Correction(options)
        stpw.Stop()

        ' Save calculations
        result.Item("word") = word
        result.Item("answer") = answer
        result.Item("options") = options
        result.Item("elapsed_time") = stpw.Elapsed.TotalMilliseconds

        Return result
    End Function

    ' Probability of 'word'
    Public Function Probability(word As String) As Double
        Dim p As Double = 0.0
        
        If wordRank.ContainsKey(word) Then
            p = wordRank.Item(word)
        End If

        Return p
    End Function

    ' The subset of 'words' that appear in the dictionary of w_rank
    Public Function Known(words As List(Of String)) As List(Of String)
        Dim wordsKnown As New List(Of String)

        For Each word As String In words
            If wordRank.ContainsKey(word) Then
                wordsKnown.Add(word)
            End If
        Next

        Return wordsKnown
    End Function

    ' All edits that are one edit away from 'word'
    Public Function Edits1(word As String) As List(Of String)
        Dim wordList As New Dictionary(Of String, Integer)()
        Dim splits(word.Length) As Tuple(Of String, String)
        Dim tWord As String

        For i As Integer = 0 To word.Length
            splits(i) = New Tuple(Of String, String)(word.Substring(0, i), word.Substring(i, word.Length - i))
        Next

        ' Add word removing 1 letter
        For i As Integer = 0 To word.Length - 1
            tWord = splits(i).Item1 & splits(i).Item2.Substring(1, word.Length - i - 1)

            If Not wordList.ContainsKey(tWord) Then
                wordList.Add(tWord, 1)
            End If
        Next

        ' Add word transposing 1 letter
        For i As Integer = 0 To word.Length
            If splits(i).Item2.Length > 1 Then
                tWord = splits(i).Item1 & splits(i).Item2(1) & splits(i).Item2(0) & splits(i).Item2.Substring(2, word.Length - i - 2)

                If Not wordList.ContainsKey(tWord) Then
                    wordList.Add(tWord, 1)
                End If
            End If
        Next

        ' Add word replacing 1 letter
        For i As Integer = 0 To word.Length - 1
            For j As Integer = 0 To LETTERS.Length - 1
                tWord = splits(i).Item1 & LETTERS(j) & splits(i).Item2.Substring(1, word.Length - i - 1)

                If Not wordList.ContainsKey(tWord) Then
                    wordList.Add(tWord, 1)
                End If
            Next
        Next

        ' Add word inserting 1 letter
        For i As Integer = 0 To word.Length
            For j As Integer = 0 To LETTERS.Length - 1
                tWord = splits(i).Item1 & LETTERS(j) & splits(i).Item2

                If Not wordList.ContainsKey(tWord) Then
                    wordList.Add(tWord, 1)
                End If
            Next
        Next

        Dim words As List(Of String) = wordList.Keys.ToList()
        Return words
    End Function

    ' All edits that are two edits away from 'word'
    Public Function Edits2(wEdits1 As List(Of String)) As List(Of String)
        Dim wordList As New Dictionary(Of String, Integer)()
        Dim wEdits2 As List(Of String)

        For Each w1 As String In wEdits1
            wEdits2 = Edits1(w1)

            For Each w2 As String In wEdits2
                If Not wordList.ContainsKey(w2) Then
                    wordList.Add(w2, 1)
                End If
            Next
        Next

        Dim words As List(Of String) = wordList.Keys.ToList()
        Return words
    End Function

    ' Most probable spelling correction for word
    Public Function Correction(options As List(Of String)) As String
        Dim answer As String = ""
        Dim currP As Double = 0.0
        Dim maxP As Double = 0.0
        
        For i As Integer = 0 To options.Count - 1
            currP = Probability(options(i))
            
            If currP > maxP Then
                maxP = currP
                answer = options(i)
            End If
        Next

        Return answer
    End Function

    ' Generate possible spelling corrections for word
    Public Function Candidates(word As String) As List(Of String)
        word = word.ToLower()

        Dim words As New List(Of String)({word})
        Dim wKnown As List(Of String)

        wKnown = Known(words)
        If wKnown.Count > 0 Then
            Return wKnown
        End If

        Dim wEdits1 As List(Of String) = Edits1(word)
        wKnown = Known(wEdits1)
        If wKnown.Count > 0 Then
            Return wKnown
        End If

        Dim wEdits2 As List(Of String) = Edits2(wEdits1)
        wKnown = Known(wEdits2)
        If wKnown.Count > 0 Then
            Return wKnown
        End If

        Return words
    End Function

End Class